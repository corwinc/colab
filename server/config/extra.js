//  <!DOCTYPE html>

// <html lang="en">
//   <head>
//     <title>ColLab</title>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
//     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
//     <script src="//cdn.quilljs.com/1.0.6/quill.min.js"></script>
//     <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
//     <link href="//cdn.quilljs.com/1.0.6/quill.snow.css" rel="stylesheet">
//     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
//     <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Oxygen:400,300,700">
//     <link rel="stylesheet" href="public/style.css">
//     <link rel="stylesheet" href="public/signup.css">
//    <link rel="stylesheet" href="public/video.css"> 
//   </head>
//   <body>
//      <video id="my-video" class="video" loop="loop" muted="" width="300" height="150">
//       <source src="public/media/demo.mp4" type="video/mp4">
//       <source src="public/media/demo.ogv" type="video/ogg">
//       <source src="public/media/demo.webm" type="video/webm">
//     </video><! /video  
//     <div class="app" />

    
//      <script>
//       (function() {
//         /**
//          * Video element
//          * @type {HTMLElement}
//          */
//         var video = document.getElementById("my-video");
//         /**
//          * Check if video can play, and play it
//          */
//         video.addEventListener( "canplay", function() {
//           video.play();
//         });
//       })();
//     </script> 
//     <script src="public/bundle.js"></script>

//     <script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s=" crossorigin="anonymous"></script>
    
//     <script src='public/adapter.js'></script>    
//    <script src='public/videocall_original.js'></script>    

//   </body>
// </html>


//  

//signup form

// render() {
//     const {userSignupRequest, addFlashMessage} = this.props;
//     return (
//       <div className="container">
//         <div className="row main">
//           <div class="panel-title text-center">
//                   <h1 class="title">Col-Lab</h1>
//                   <hr />
//                 </div>
//             <div className="col-md-4 col-md-offset-4">
              
//             <SignupForm userSignupRequest={userSignupRequest} 
//             addFlashMessage={addFlashMessage}/> 
//             </div>
//           </div>
//       </div>
      
//     )
//   }


/////////signupForm 


// import React from 'react';
// import classnames from 'classnames';
// import {Link} from 'react-router'


// class SignupForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstname:'',
//       lastname:'',
//       username:'',
//       email:'',
//       password:'',

//     }
//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   onChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   }

//   onSubmit(e) {
//     // this.setState({errors: {} });
//     e.preventDefault();

//     this.props.userSignupRequest(this.state).then(

//       (res) => {
//         if (res !== 'A user with that username already exists.') {
//           console.log('response', res);
//           this.props.addFlashMessage({
//             type: 'success',
//             text: 'you signed up successfully. Welcome'
//           })
//           this.context.router.push('/documentlist');
//         } else {
          
//             this.setState({username: 'A user with that username already exists.'});
//             return;
            

//         }
//       },
//     ).catch(
//       (err) => {
//         console.log('err ', err);
//       }
//     )
//   }

//   render() {
//     const {errors} = this.state;
//     return (
//       <div class="main-login main-center"> 
//       <form className="form-horizontal" 
//         method="post" 
//         action="#"
        
//         onSubmit={this.onSubmit}>


//         <div className="form-group" >
//           <label for="name" 
//             className="cols-sm-2 control-label">Firstname</label>
//           <div className="cols-sm-10">
//             <div className="input-group">
//               <span className="input-group-addon">
//               <i className="fa fa-user fa" 
//                 aria-hidden="true">
//               </i></span> 
//               <input 
//                 value={this.state.firstname}
//                 onChange={this.onChange}
//                 type="text"

//                 name="firstname"
//                 className="form-control"
//                 placeholder="Clara" required
//               />
//               </div>
//             </div>
//         </div>

              
//         <div className="form-group">
//           <label for="email" 
//             className="cols-sm-2 control-label">Lastname</label>
//           <div class="cols-sm-10">
//             <div class="input-group">
//               <span class="input-group-addon">
//               <i class="fa fa-user fa" 
//                 aria-hidden="true">
//               </i></span>
//               <input 
//                 value={this.state.lastname}
//                 onChange={this.onChange}
//                 type="text"
//                 name="lastname"
//                 className="form-control"
//                 placeholder="Bell" required
//               />
//             </div>
//           </div>
//         </div>

//         <div className="form-group">
//           <label for="username" 
//             className="cols-sm-2 control-label">Username</label>
//           <div class="cols-sm-10">
//             <div class="input-group">
//               <span class="input-group-addon">
//               <i class="fa fa-users fa" 
//                 aria-hidden="true">
//               </i></span>
//               <input 
//                 value={this.state.username}
//                 onChange={this.onChange}
//                 type="text"
//                 name="username"
//                 placeholder="Mike123"
//                 className="form-control" required
//               />
//             </div>
//           </div>
//         </div>

//         <div className="form-group">
//           <label for="email" 
//             className="cols-sm-2 control-label">Email</label>
//           <div className="cols-sm-10">
//             <div className="input-group">
//               <span className="input-group-addon">
//               <i className="fa fa-envelope fa" 
//                 aria-hidden="true">
//               </i></span>
//               <input 
//                 value={this.state.email}
//                 onChange={this.onChange}
//                 type="email"
//                 name="email"
//                 placeholder="Email" 
//                 className="form-control" required
//               />
//             </div>
//           </div>
//         </div>

//         <div className="form-group">
//           <label for="email" 
//             className="cols-sm-2 control-label">Password</label>
//           <div className="cols-sm-10">
//             <div className="input-group">
//               <span className="input-group-addon">
//               <i className="fa fa-lock fa-lg" 
//                 aria-hidden="true">
//               </i></span>
//               <input 
//                 value={this.state.password}
//                 onChange={this.onChange}
//                 type="password"
//                 data-minlength="6"
//                 name="password"
//                 className="form-control" 
//                 placeholder="Password" required
//               />

//             </div>
//           </div>
//         </div>
  

//         <div className="form-group">
//           <button type="button" className="btn btn-primary btn-lg
//            btn-block login-button">
//            Register
//           </button>
//         </div>
//         <div className="form-group">
//               Already have an account? <Link to="/login">Sign in</Link>
//             </div>
//             <div className="form-group">
//               <a className="btn btn-primary btn-lg btn-block login-button" href="/auth/facebook">Sign Up With Facebook</a>
//             </div>
//       </form>
//       </div>
//     );
//   }
// }

// SignupForm.propTypes = {

//   userSignupRequest: React.PropTypes.func.isRequired, 
//   addFlashMessage: React.PropTypes.func.isRequired 
// }

// SignupForm.contextTypes = {
//   router: React.PropTypes.object.isRequired
// }
// export default SignupForm;

//oauth.jsx

// import React from 'react';
// import { browserHistory } from 'react-router';

// const OAuthSuccess = (props) => {

//   console.log('props-------------->', props.location.query);
//   if (props.location.query.token) {
//     // //id = Number(id);
//     const user = props.location.query.fb_name;
//     localStorage.setItem('userToken', props.location.query.token);
//     localStorage.setItem('user', JSON.stringify(user));
//   }

//   browserHistory.replace('/documentlist');

//   return (<div />);
// };

// export default OAuthSuccess;


// localStorage.userToken = this.props.location.query.username;
    // const username = this.props.location.query.username;
    // localStorage.user = JSON.stringify(username);
    // console.log('userToken-->', localStorage.userToken);
    // console.log('user-->', localStorage.user);