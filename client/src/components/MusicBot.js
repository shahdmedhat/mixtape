//import React from "react";
import React, { Component } from 'react';
import "../css/MusicBot.css";
//import { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import PropTypes from 'prop-types';

class Review extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        activity: ''
      };
    }
  
    componentWillMount() {
      const { steps } = this.props;
      const { activity } = steps;
      
      this.setState({ activity });
    //   this.props.setActivity(activity.value)
      
    }
  
    render() {
      const { activity } = this.state;
      return (
        <div style={{ width: '100%' }}>
          <table>
            <tbody>
              <tr>
                <td>{activity.value}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  Review.propTypes = {
    steps: PropTypes.object,
  };
  
  Review.defaultProps = {
    steps: undefined,
  };
  
class MusicBot extends Component{
//   const [activity, setActivity] = useState("");
//   useEffect(() => {
//     console.log(activity);
//   }, [activity]);

render() {
  return (
    <div className="musicbot-container">
      <ChatBot
        headerTitle="MusicBot"
        speechSynthesis={{ enable: true, lang: 'en' }}
        steps={[
            {
                id: '1',
                message: 'Welcome to MusicBot, What is your name?',
                trigger: '2',
              },
              {
                id: '2',
                user: true,
                trigger: '3',
              },
              {
                id: '3',
                message: 'Hi {previousValue}, nice to meet you!',
                trigger: '4',
              },
              {
                id:'4', 
                message: 'Were you doing something else just now?',
                trigger: 'activity'
              },
              
              {
                id: 'activity',
                options: [
                    { value: 'studying', label: 'Option 1', trigger: '6' },
                    { value: 'working', label: 'Option 2', trigger: '6' },
                    { value: 'nothing', label: 'Option 3', trigger: '6' },
                  ],
                  
              },
              
              { id: '6',
              component: <Review setActivity={this.props.setActivity} />,
              asMessage: true,
              trigger: '7'},
              
              {
                id:'7', 
                message: 'Great!',
                end: true
              }
              
            ]}
      />
    </div>
  );
  }
}

export default MusicBot;
