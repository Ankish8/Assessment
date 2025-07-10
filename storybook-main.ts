import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  // Story patterns optimized for large projects
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  
  // Essential addons for production deployment
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials', 
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
  ],
  
  framework: {
    name: '@storybook/angular',
    options: {
      // Optimize for production builds
      enableIvy: true,
      enableProdMode: true,
    },
  },
  
  // Core optimizations for large projects
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
  
  // TypeScript configuration
  typescript: {
    check: false, // Disable type checking during build for speed
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: any) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  
  // Build optimizations
  build: {
    test: {
      // Disable docs addon in test builds for speed
      disabledAddons: [
        '@storybook/addon-docs',
        '@storybook/addon-essentials/docs'
      ]
    }
  },
  
  // Documentation settings
  docs: {
    autodocs: 'tag', // Generate docs only for tagged stories
    defaultName: 'Docs',
  },
  
  // Performance optimizations for large story sets
  features: {
    buildStoriesJson: true, // Enable for better performance
    storyStoreV7: true, // Use modern story store
  },
  
  // Static directory for assets
  staticDirs: ['../public'],
  
  // Babel configuration for optimal builds
  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,
      // Add any needed babel plugins here
    ],
  }),
  
  // Webpack optimizations for large projects
  webpackFinal: async (config) => {
    // Optimize chunks for better loading
    if (config.optimization) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    // Increase memory limit for large builds
    if (config.performance) {
      config.performance = {
        ...config.performance,
        maxAssetSize: 5000000, // 5MB
        maxEntrypointSize: 5000000, // 5MB
      };
    }
    
    return config;
  },
};

export default config;