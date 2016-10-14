import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as editor from '../actions/editorActions.jsx';
import * as doclist from '../actions/documentlistActions.jsx';
import * as comment from '../../comments/actions/commentActions.jsx';


class TextEditor extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    var urldocId = window.location.search.split('').splice(11).join('');
    var user = 'user_' + Date.now(); // temp unique user identifier; swap out later with username
    var sharelinkId = urldocId.length === 0 ? 'hr46' : urldocId; // default to public doc if there is no doc id in url
    console.log('EDITOR sharelink componentWillMount:', sharelinkId);
    this.props.dispatch(editor.setLink(sharelinkId));
  }

  componentDidMount () {
    var username = window.localStorage.user.slice(1, window.localStorage.user.length - 1);
    axios.get('users/id/?username=' + username)
      .then(function(res) {
        this.props.dispatch( doclist.setUserId(JSON.stringify(res.data) ));
      }.bind(this))
      .catch(function(err) {
        console.log('Error retrieving user.')
      });

    var Delta = Quill.import('delta');
    var urldocId = window.location.search.split('').splice(11).join('');
    var user = 'user_' + Date.now(); // temp unique user identifier; swap out later with username
    
    // may need setSelectionLoc in store
    var context = this;
    var setSelectionLoc = this.props.setSelectionLoc;
    
    var sharelinkId = urldocId.length === 0 ? 'hr46' : urldocId; // default to public doc if there is no doc id in url
    

    // NOTE: Moved this logic to textVideoPage's componentWillMount in order to set sharelink sooner:
    // this.props.dispatch(editor.setLink(sharelinkId));


    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike', 'image'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ];

    var quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });

    // this.props.dispatch
    this.props.dispatch(editor.initQuill(quill));

    var socket = io('/editor');

    var change = new Delta();
    quill.on('text-change', function(delta, olddelta, source) {
      if (source === 'user') {
        change = change.compose(delta); // for saving partial changes
        socket.emit('change', {'sharelinkId': sharelinkId, 'who': user, 'delta': JSON.stringify(delta)});
      }
    });

    // GET SELECTION LOCATION
    quill.on('selection-change', function(range, oldRange, source) {
      if (range) {
        if (range.length == 0) {
          console.log('User cursor is on', range.index);
        } else {
          var text = quill.getText(range.index, range.length);
          console.log('User has highlighted', text);
          console.log('range index:', range.index);
        }
      } else {
        console.log('Cursor not in the editor');
      }

      var bounds = quill.getBounds(range.index);
      console.log('bounds:', bounds);
      if (range.length !== 0) {  
        context.props.dispatch(editor.setSelectionLoc(bounds.top));
        context.props.dispatch(editor.saveSelectionLoc(bounds.top));          
      }

      if (range.length === 0) {
        context.props.dispatch(editor.setSelectionLoc(null));
      }
    });

// CHECK IF BELOW CODE IS IN THE RIGHT PLACE, IF NOT, TRY MOVING INTO THE ABOVE CODE BLOCK
//         var bounds = quill.getBounds(range.index);
//         console.log('bounds:', bounds);
//         if (range.length !== 0) {
//           context.props.dispatch(editor.setSelectionLoc(bounds.top));
//           context.props.dispatch(editor.saveSelectionLoc(bounds.top));          
//         }

    socket.on('change', function(msg){
      if(msg.who !== user && sharelinkId === msg.sharelinkId) { // prevent infinite loop; user who emitted msg should not receive it
        var del = JSON.parse(msg.delta);
        quill.updateContents( del );
      }
    });
    
    console.log('EDITOR componentDidMount sharelinkid:', sharelinkId);
    axios.get('/document?sharelink=' + sharelinkId)
      .then(function(res) {
        quill.setContents( JSON.parse(res.data.textS3) );
      })
      .catch(function(err) {
        console.log('Error:' + err);
      });

    /*
      Include save Interval for auto save
    */
    var saveInterval = setInterval(function() {
      if (change.length() > 0) {
        console.log('Saving changes', sharelinkId);

        // should comment out to limit AWS RDS db hits
        axios.put('/document', {
          sharelink: sharelinkId,
          textS3: JSON.stringify(quill.getContents()),
          title: quill.getText().slice( 0, quill.getText().indexOf('\n') )
        })
          .then(function(result) {
            console.log('data saved');

            change = new Delta();

          });
      } 
    }, 5000);

    // this.setState({ saveInterval: saveInterval });
  }

  saveDoc(quill, sharelinkId) {
    console.log('curUser:', this.props.curUser);

    axios.put('/document', {
      sharelink: sharelinkId,
      textS3: JSON.stringify(quill.getContents()),
      title: quill.getText().slice( 0, quill.getText().indexOf('\n') )
    })
   .then(function(result) {
     console.log('data saved:', result);
    });
  }

  render () {
    return (
      <div>
        <span>{ this.props.quill[0] }</span>
        <div id="editor">
        </div>
      </div>
  );
  }
} 

// export default TextEditor;

export default connect((store) => {
  return {
    quill: [],
    saveInterval: null,
    sharelinkId: store.editor.sharelinkId,
    user: null,
    curUser: store.documentlist.curUser,
    // selectionLoc: store.editor.selectionLoc
  }
})(TextEditor);
