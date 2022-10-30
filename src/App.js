import logo from './logo.svg';
import './App.css';

import Paper from '@mui/material/Paper';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

import React, { useState } from 'react';
import cxtmenu from 'cytoscape-cxtmenu';
import { Dialog } from '@mui/material';
import AddModel from './component/AddModel';

cytoscape.use( cxtmenu );
cytoscape.use( dagre );

var cy = null;
var layoutDef = {
  //name: 'cose-bilkent',
  name:'dagre',
  nodeDimensionsIncludeLabels: true,
  tilingPaddingVertical: 15,
  fit: true,
  animate: false,
  tree:false,
  edgeWeight: function( edge ){ return 1; },
  rows: 1
};
var cytoData = {
  nodes: [
    {
      data: { id: 'root',name:"Song", type:'rootNode' }
    },

    {
      data: { id: 'r',name:"Recording", type:'asset', subType:'recording' }
    },
    {
      data: { id: 'l',name:"Lyrics", type:'asset', subType:'lyrics' }
    }
    ,
    {
      data: { id: 'c',name:"Composition", type:'asset', subType:'composition' }
    }
  ],
  edges: [
    {
      data: { id: 'rr', source: 'root', target: 'r', perc: '' }
    },
    {
      data: { id: 'rl', source: 'root', target: 'l', perc: '' }
    },
    {
      data: { id: 'rc', source: 'root', target: 'c', perc: '' }
    }
  ]
}

function App() {
  
  const [addModelOpen, setAddModelOpen] = useState(false);
  const [modelData, setModelData] = useState({});

  const onNodeClick = (aaa) => {
    console.log("Click", aaa)
  }
  const onEdit = (data) => {
    console.log("Editing", data)
  }

  const removeNode = (node) => {
    console.log("Removing", node)
    cy.remove(`node[id = "${node.id}"]`);
  }

  const addNode = (parent, data) => {
    console.log("Adding Node ", parent, data)
    cy.add([
      {group: "nodes", data: data},
      { group: "edges", data: { id: parent.id + "-" +data.id, source: parent.id, target: data.id, perc: data.perc}}
  ])
    setModelData({});
    setAddModelOpen(false);
    cy.layout(layoutDef).run();
  }

  const toggleAddNode = (data) => {
    setModelData(data);
    setAddModelOpen(true);
  }

  React.useEffect(() => {
      console.log("Effect")

      if(!cy){
      cy = cytoscape({

        container: document.getElementById('cy'), // container to render in
      
        elements:cytoData,
      
        style: [ // the stylesheet for the graph
          {
            selector: 'node',
            style: {
              'background-color': '#666',
              'label': 'data(name)',
              'width': '75px',
              'height': '75px'
            }
          },
          {
            selector: 'node[type = "rootNode"]',
            style: {
              'background-color': '#333',
            }
          },
          {
            selector: 'node[subType = "recording"]',
            style: {
              'background-image': './recording.png',
              'background-size': 'contain',
              'background-repeat': 'no-repeat'  
            }
          },
          {
            selector: 'node[subType = "lyrics"]',
            style: {
              'background-image': './lyrics.png',
              'background-size': 'contain',
              'background-repeat': 'no-repeat',
              'background-color': 'white',
            }
          },
          {
            selector: 'node[type = "entity"]',
            style: {
              'background-image': './entity.png',
              'background-size': 'contain',
              'background-repeat': 'no-repeat',
              'background-color': 'white',
            }
          },
          {
            selector: 'node[subType = "composition"]',
            style: {
              'background-image': './composition.png',
              'background-size': 'contain',
              'background-repeat': 'no-repeat',
              'background-color': 'white',
            }
          },
          {
            selector: 'node[subType = "label"]',
            style: {
              'background-image': './label.png',
              'background-size': 'contain',
              'background-repeat': 'no-repeat',
              'background-color': 'white',
            }
          },
          {
            selector: 'node[subType = "publisher"]',
            style: {
              'background-image': './publisher.png',
              'background-size': 'contain',
              'background-repeat': 'no-repeat',
              'background-color': 'white',
            }
          },
          
          {
            selector: 'edge',
            style: {
              'width': 10,
              'line-color': '#ccc',
              'curve-style': 'bezier',
              'label': 'data(perc)'
            }
          }
        ],
      
        layout: layoutDef
      
      });
      let defaults = {
        menuRadius: function(ele){ return 100; }, // the outer radius (node center to the end of the menu) in pixels. It is added to the rendered size of the node. Can either be a number or function as in the example.
        selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
        commands: function(ele) { 
          var data = ele.data();
          var fullColor = 'rgba(0, 51, 102, 0.85)'
          var commandList =  [ // an array of commands to list in the menu or a function that returns the array
          
            { // example command
              fillColor: fullColor, // optional: custom background color for item
              content: 'Edit ' + data.name, // html/text content to be displayed in the menu
              contentStyle: {}, // css key:value pairs to set the command's css in js if you want
              select: function(ele){ // a function to execute when the command is selected
                console.log( ele.id() ) // `ele` holds the reference to the active element
              },
              enabled: true // whether the command is selectable
            }]
            switch(data.type) {
              case 'rootNode':

                break;

              case 'entity':
                commandList = commandList.concat([
                  { // example command
                    fillColor: fullColor, // optional: custom background color for item
                    content: 'Add royalty split', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function(ele){ // a function to execute when the command is selected
                      toggleAddNode( ele.data() ) // `ele` holds the reference to the active element
                    },
                    enabled: true // whether the command is selectable
                  },
                  { // example command
                    fillColor: fullColor, // optional: custom background color for item
                    content: 'Remove ' + data.name, // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function(ele){ // a function to execute when the command is selected
                      removeNode(ele.data());
                      // `ele` holds the reference to the active element
                    },
                    enabled: true // whether the command is selectable
                  }
                ])
                break;
              case 'asset':
                commandList = commandList.concat([
                  { // example command
                    fillColor: fullColor, // optional: custom background color for item
                    content: 'Add royalty split', // html/text content to be displayed in the menu
                    contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                    select: function(ele){ // a function to execute when the command is selected
                      toggleAddNode( ele.data() ) // `ele` holds the reference to the active element
                    },
                    enabled: true // whether the command is selectable
                  },
                  // { // example command
                  //   fillColor: fullColor, // optional: custom background color for item
                  //   content: 'Remove ' + data.name, // html/text content to be displayed in the menu
                  //   contentStyle: {}, // css key:value pairs to set the command's css in js if you want
                  //   select: function(ele){ // a function to execute when the command is selected
                  //     // `ele` holds the reference to the active element
                  //   },
                  //   enabled: true // whether the command is selectable
                  // }
                ])

                break;
            }
          
            return commandList;
          
          
          }
        , // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
        fillColor: 'rgba(0, 0, 0, 0.05)', // the background colour of the menu
        activeFillColor: 'rgba(255, 153, 153, 0.75)',//'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
        activePadding: 10, // additional size in pixels for the active command
        indicatorSize: 22, // the size in pixels of the pointer to the active command, will default to the node size if the node size is smaller than the indicator size, 
        separatorWidth: 3, // the empty spacing in pixels between successive commands
        spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
        adaptativeNodeSpotlightRadius: false, // specify whether the spotlight radius should adapt to the node size
        minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
        maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
        openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
        itemColor: 'white', // the colour of text in the command's content
        itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
        zIndex: 9999, // the z-index of the ui div
        atMouse: false, // draw menu at mouse position
        outsideMenuCancel: false // if set to a number, this will cancel the command if the pointer is released outside of the spotlight, padded by the number given 
      }
      
      let menu = cy.cxtmenu( defaults );

        cy.on('tap', 'node', onNodeClick);

    }
  });


  return (
    <div className="App">
      {/* <header className="App-header">
       
      </header> */}

      <Paper style={{width:'100%', height:'100vh'}}>
           
                <div id="cy" style={{minHeight:'100%',
    width:'100%',
  '& div': {
    // display: 'flex',
    minHeight:'100vh',
     width:'100%',
    // flexWrap: 'wrap'
   }}}></div>
                
            </Paper>
            <Dialog open={addModelOpen} onClose={() => {
              setAddModelOpen(false);
              setModelData({});
            }}>
              <AddModel data={modelData} callback={addNode}/>
            </Dialog>
            
    </div>
  );
}

export default App;
