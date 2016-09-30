//just going to be render a list of books
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {selectBook} from '../actions/index.jsx';
//this bindActionCreators will bind the action return
//by the action creactor and make sure it flows to all the reducers
import {bindActionCreators} from 'redux';


class Booklist extends Component {
	renderList() {
		return this.props.books.map((book) => {
			return (
				<li key={book.title} 
				onClick={() => {this.props.selectBook(book)}}
				className="list-group-item">
				{book.title}
				</li>
			);
		});
	}

	render() {
		// -> 123
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		)
	}
}

/*purpose of this function is to take application state as an argument
	
	//state contains array of books 
	//and active book
*/

function mapStateToProps(state) {
	// Whatever is returned will show up as props
	//inside of booklist

	//this function is a glu b/w react and redux
	return {
		books: state.books 
	}

	//connect function says take this component and this function mapStateToProps
	//and return a container


}


/*connect react views and redux
	//a container is a react component that has a direct
	connection to the state manage/produce by redux
	//containers are smart components having injected store init

	//dumb components cuz they dont have direct connection
	to redux

*/


//Anything returned from this function will end
//up as props on the BookList container

function mapDispatchToProps(dispatch) {
	//Whenever selectBook is called, the result should be passed
	//to all the of our reducers

	//dispatch function takes the result to all reducers
	return bindActionCreators({selectBook: selectBook}, dispatch);	
}


//connect takes a function a function and a component and producing a container

//Promote BookList from a component to a container
//- it needs to know about this new dispatch method,
//selectBook. Make it available as a prop.
export default connect(mapStateToProps,mapDispatchToProps)(Booklist);

//note:

	//if states ever changes this function mapStateToProps
	//rerender the state inside this function in this container

	//action creator returns an action and those actions flows to diff
	//reducers and then reducers use perticular action to produce value for its peice of state