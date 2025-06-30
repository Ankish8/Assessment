import{j as e}from"./jsx-runtime-11dfd0be.js";import{R as v}from"./index-0f6109cd.js";import{T as w,B as b}from"./TestCases-fd4f2ae6.js";import"./index-b921f775.js";import"./index-15fa70d3.js";const F={title:"Pages/TestCases",component:w,decorators:[t=>e.jsx(b,{children:e.jsx("div",{style:{fontFamily:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",backgroundColor:"#fcfcfd",minHeight:"100vh",margin:0,padding:0},children:e.jsx(t,{})})})],parameters:{layout:"fullscreen",docs:{description:{component:"Test Cases page component that allows users to create and manage test cases for coding questions. Features include manual test case creation, bulk upload, and code verification."}}}},a={name:"Initial State",parameters:{docs:{description:{story:'The default state when no test cases have been created yet. Shows the upload interface and "Create First Test Case" button.'}}}},n={name:"With Test Cases",decorators:[t=>{const s=[{id:1,input:`5
1 2 3 4 5`,output:"15",weightage:20,isExpanded:!0},{id:2,input:`3
10 20 30`,output:"60",weightage:30,isExpanded:!1}];return v.useEffect(()=>(localStorage.setItem("testCasesData",JSON.stringify({testCases:s})),()=>{localStorage.removeItem("testCasesData")}),[]),e.jsx(t,{})}],parameters:{docs:{description:{story:"Shows the interface when test cases have been added. Displays individual test cases with expand/collapse functionality."}}}},o={name:"Verify Mode",decorators:[t=>{const s=[{id:1,input:`5
1 2 3 4 5`,output:"15",weightage:50,isExpanded:!1}];return v.useEffect(()=>{localStorage.setItem("testCasesData",JSON.stringify({testCases:s}));const i=localStorage.getItem;return localStorage.getItem=c=>c==="testCasesData"?JSON.stringify({testCases:s,verifyMode:!0}):i.call(localStorage,c),()=>{localStorage.getItem=i,localStorage.removeItem("testCasesData")}},[]),e.jsx(t,{})}],parameters:{docs:{description:{story:"Shows the interface with verify mode enabled, displaying the code editor for testing solutions against test cases."}}}},r={name:"Upload Focus",parameters:{docs:{description:{story:"Highlights the file upload interface for bulk test case creation."}}},decorators:[t=>e.jsxs("div",{style:{fontFamily:"'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",backgroundColor:"#fcfcfd",minHeight:"100vh",margin:0,padding:0},children:[e.jsx(t,{}),e.jsx("style",{children:`
          .upload-area:hover {
            border-color: #7f56d9 !important;
            background: #f9fafb !important;
          }
        `})]})]};var d,l,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  name: 'Initial State',
  parameters: {
    docs: {
      description: {
        story: 'The default state when no test cases have been created yet. Shows the upload interface and "Create First Test Case" button.'
      }
    }
  }
}`,...(m=(l=a.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,u,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'With Test Cases',
  decorators: [Story => {
    // Mock localStorage to show test cases
    const mockTestCases = [{
      id: 1,
      input: '5\\n1 2 3 4 5',
      output: '15',
      weightage: 20,
      isExpanded: true
    }, {
      id: 2,
      input: '3\\n10 20 30',
      output: '60',
      weightage: 30,
      isExpanded: false
    }];
    React.useEffect(() => {
      localStorage.setItem('testCasesData', JSON.stringify({
        testCases: mockTestCases
      }));
      return () => {
        localStorage.removeItem('testCasesData');
      };
    }, []);
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Shows the interface when test cases have been added. Displays individual test cases with expand/collapse functionality.'
      }
    }
  }
}`,...(f=(u=n.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var g,h,y;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Verify Mode',
  decorators: [Story => {
    const mockTestCases = [{
      id: 1,
      input: '5\\n1 2 3 4 5',
      output: '15',
      weightage: 50,
      isExpanded: false
    }];
    React.useEffect(() => {
      localStorage.setItem('testCasesData', JSON.stringify({
        testCases: mockTestCases
      }));

      // Mock verify mode being enabled
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = key => {
        if (key === 'testCasesData') {
          return JSON.stringify({
            testCases: mockTestCases,
            verifyMode: true
          });
        }
        return originalGetItem.call(localStorage, key);
      };
      return () => {
        localStorage.getItem = originalGetItem;
        localStorage.removeItem('testCasesData');
      };
    }, []);
    return <Story />;
  }],
  parameters: {
    docs: {
      description: {
        story: 'Shows the interface with verify mode enabled, displaying the code editor for testing solutions against test cases.'
      }
    }
  }
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var S,C,I;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  name: 'Upload Focus',
  parameters: {
    docs: {
      description: {
        story: 'Highlights the file upload interface for bulk test case creation.'
      }
    }
  },
  decorators: [Story => <div style={{
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#fcfcfd',
    minHeight: '100vh',
    margin: 0,
    padding: 0
  }}>
        <Story />
        <style>{\`
          .upload-area:hover {
            border-color: #7f56d9 !important;
            background: #f9fafb !important;
          }
        \`}</style>
      </div>]
}`,...(I=(C=r.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const M=["Default","WithTestCases","WithVerifyMode","UploadInterface"];export{a as Default,r as UploadInterface,n as WithTestCases,o as WithVerifyMode,M as __namedExportsOrder,F as default};
