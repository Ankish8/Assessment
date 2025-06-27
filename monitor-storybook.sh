#!/bin/bash

# =============================================================================
# MAPIT Storybook Monitoring Script
# =============================================================================
# Continuous monitoring script for deployed Storybook
# Usage: ./monitor-storybook.sh <url> [interval_minutes]
# =============================================================================

set -euo pipefail

# Configuration
URL=${1:-"https://ankish8.github.io/MAPIT-storybook/"}
INTERVAL_MINUTES=${2:-30}
LOG_FILE="storybook-monitor.log"
ALERT_THRESHOLD=3  # Number of consecutive failures before alert

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
CONSECUTIVE_FAILURES=0
TOTAL_CHECKS=0
TOTAL_FAILURES=0

log_message() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

print_status() {
    local status=$1
    local message=$2
    local color=$NC
    
    case $status in
        "SUCCESS") color=$GREEN ;;
        "FAILURE") color=$RED ;;
        "WARNING") color=$YELLOW ;;
        "INFO") color=$BLUE ;;
    esac
    
    echo -e "${color}[$status]${NC} $message"
    log_message "[$status] $message"
}

check_accessibility() {
    local url=$1
    
    # Basic HTTP check
    if curl -sSf --max-time 30 "$url" > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

check_performance() {
    local url=$1
    
    # Measure response time
    local start_time=$(date +%s%N)
    if curl -sSf --max-time 30 "$url" > /dev/null 2>&1; then
        local end_time=$(date +%s%N)
        local response_time_ms=$(( (end_time - start_time) / 1000000 ))
        echo $response_time_ms
        return 0
    else
        echo "-1"
        return 1
    fi
}

check_content_integrity() {
    local url=$1
    
    # Check for essential Storybook elements
    local content=$(curl -s --max-time 30 "$url" 2>/dev/null || echo "")
    
    if [[ -n "$content" ]] && echo "$content" | grep -q "storybook\|Storybook"; then
        return 0
    else
        return 1
    fi
}

check_stories_endpoint() {
    local url=$1
    local iframe_url="${url%/}/iframe.html"
    
    if curl -sSf --max-time 30 "$iframe_url" > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

perform_health_check() {
    local url=$1
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    print_status "INFO" "Starting health check for: $url"
    
    ((TOTAL_CHECKS++))
    local check_passed=true
    
    # 1. Accessibility Check
    if check_accessibility "$url"; then
        print_status "SUCCESS" "Site is accessible"
    else
        print_status "FAILURE" "Site is not accessible"
        check_passed=false
    fi
    
    # 2. Performance Check
    local response_time=$(check_performance "$url")
    if [[ $response_time -gt 0 ]]; then
        if [[ $response_time -lt 5000 ]]; then
            print_status "SUCCESS" "Response time: ${response_time}ms"
        else
            print_status "WARNING" "Slow response time: ${response_time}ms"
        fi
    else
        print_status "FAILURE" "Failed to measure response time"
        check_passed=false
    fi
    
    # 3. Content Integrity Check
    if check_content_integrity "$url"; then
        print_status "SUCCESS" "Content integrity verified"
    else
        print_status "FAILURE" "Content integrity check failed"
        check_passed=false
    fi
    
    # 4. Stories Endpoint Check
    if check_stories_endpoint "$url"; then
        print_status "SUCCESS" "Stories endpoint accessible"
    else
        print_status "FAILURE" "Stories endpoint not accessible"
        check_passed=false
    fi
    
    # Update failure counters
    if [[ $check_passed == true ]]; then
        CONSECUTIVE_FAILURES=0
        print_status "SUCCESS" "All health checks passed"
    else
        ((CONSECUTIVE_FAILURES++))
        ((TOTAL_FAILURES++))
        print_status "FAILURE" "Health check failed (consecutive failures: $CONSECUTIVE_FAILURES)"
        
        # Alert if threshold reached
        if [[ $CONSECUTIVE_FAILURES -ge $ALERT_THRESHOLD ]]; then
            send_alert "$url"
        fi
    fi
    
    # Log summary
    local success_rate=$(( ((TOTAL_CHECKS - TOTAL_FAILURES) * 100) / TOTAL_CHECKS ))
    print_status "INFO" "Health check summary - Total: $TOTAL_CHECKS, Failures: $TOTAL_FAILURES, Success Rate: ${success_rate}%"
}

send_alert() {
    local url=$1
    local alert_message="ALERT: Storybook at $url has failed $CONSECUTIVE_FAILURES consecutive health checks"
    
    print_status "WARNING" "$alert_message"
    
    # Write alert to separate alert log
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $alert_message" >> "storybook-alerts.log"
    
    # Here you could add additional alerting mechanisms:
    # - Send email notification
    # - Post to Slack webhook
    # - Send SMS via API
    # - Create GitHub issue
    
    # Example: Simple email alert (requires mailutils)
    # echo "$alert_message" | mail -s "Storybook Health Alert" admin@example.com
}

generate_status_report() {
    print_status "INFO" "Generating status report..."
    
    cat << EOF > "storybook-status-report.html"
<!DOCTYPE html>
<html>
<head>
    <title>Storybook Health Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .success { color: green; }
        .failure { color: red; }
        .warning { color: orange; }
        .metric { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>MAPIT Storybook Health Report</h1>
    <p>Generated: $(date)</p>
    <p>URL: <a href="$URL">$URL</a></p>
    
    <div class="metric">
        <h3>Key Metrics</h3>
        <ul>
            <li>Total Checks: $TOTAL_CHECKS</li>
            <li>Total Failures: $TOTAL_FAILURES</li>
            <li>Consecutive Failures: $CONSECUTIVE_FAILURES</li>
            <li>Success Rate: $(( ((TOTAL_CHECKS - TOTAL_FAILURES) * 100) / TOTAL_CHECKS ))%</li>
        </ul>
    </div>
    
    <div class="metric">
        <h3>Recent Log Entries</h3>
        <pre>$(tail -20 "$LOG_FILE" 2>/dev/null || echo "No log entries found")</pre>
    </div>
</body>
</html>
EOF
    
    print_status "SUCCESS" "Status report generated: storybook-status-report.html"
}

cleanup_logs() {
    # Keep only last 1000 lines of log file
    if [[ -f "$LOG_FILE" ]] && [[ $(wc -l < "$LOG_FILE") -gt 1000 ]]; then
        tail -1000 "$LOG_FILE" > "${LOG_FILE}.tmp"
        mv "${LOG_FILE}.tmp" "$LOG_FILE"
        print_status "INFO" "Log file trimmed to last 1000 entries"
    fi
}

show_usage() {
    cat << EOF
MAPIT Storybook Monitor

Usage: $0 <url> [interval_minutes]

Arguments:
  url               The Storybook URL to monitor
  interval_minutes  Check interval in minutes (default: 30)

Examples:
  $0 https://ankish8.github.io/MAPIT-storybook/
  $0 https://ankish8.github.io/MAPIT-storybook/ 15

The script will:
- Check site accessibility
- Measure response time
- Verify content integrity
- Test stories endpoint
- Log all results
- Generate alerts on repeated failures
- Create status reports

Files created:
- storybook-monitor.log: Detailed monitoring log
- storybook-alerts.log: Alert notifications
- storybook-status-report.html: HTML status report

Press Ctrl+C to stop monitoring.
EOF
}

main() {
    if [[ $# -eq 0 ]] || [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]]; then
        show_usage
        exit 0
    fi
    
    echo "============================================="
    echo "🔍 MAPIT Storybook Monitor Starting"
    echo "============================================="
    echo "URL: $URL"
    echo "Check Interval: $INTERVAL_MINUTES minutes"
    echo "Log File: $LOG_FILE"
    echo "Press Ctrl+C to stop"
    echo "============================================="
    
    # Initial health check
    perform_health_check "$URL"
    
    # Set up signal handlers for graceful shutdown
    trap 'echo -e "\n\nStopping monitor..."; generate_status_report; exit 0' SIGINT SIGTERM
    
    # Main monitoring loop
    while true; do
        echo -e "\nWaiting ${INTERVAL_MINUTES} minutes until next check..."
        sleep $((INTERVAL_MINUTES * 60))
        
        perform_health_check "$URL"
        cleanup_logs
        
        # Generate status report every 10 checks
        if [[ $((TOTAL_CHECKS % 10)) -eq 0 ]]; then
            generate_status_report
        fi
    done
}

# Run main function
main "$@"