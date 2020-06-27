import React, {Component} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';
import './App.css';

import { setSearchField} from '../Actions';
import {searchRobots} from '../Reducers';



const mapStateToProps = state => {
    return {
        searchField: searchRobots(state.searchField)
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots:[]
        }
    }

    componentDidMount() {
        
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response=> response.json())
          .then(users => {this.setState({ robots: users})});
      }
    
    render(){
        const {robots} = this.state;
        const {searchField, onSearchChange } = this.props;
        
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })

        // Ternary operator, which handles when the page is loading and when it has loaded
        return (!robots.length) ?
        <h1>Loading</h1> :
         
            (
                <div className="text-center">
                    <h1 style = {{marginTop:'10px'}}>RoboFriends</h1>
                    <SearchBox searchChange = {onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }


export default connect(mapStateToProps, mapDispatchToProps)(App);