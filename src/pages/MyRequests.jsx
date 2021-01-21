import React, { Component } from 'react'
import { Link } from "react-router-dom"
import apiHandler from '../api/apiHandler';
import CardMyDemands from '../components/Cards/CardMyDemands'

import "../styles/adminDashboard.css"

class MyDemands extends Component {

    state = {
        demands: [],
    }

    componentDidMount() {
       this.fetchDemandsByUser()
    }

    fetchDemandsByUser = () => {
        apiHandler.getDemandsByUser().then((data) => {
            this.setState({demands: data})
        })
    }

    
    handleDelete = (demandId) => {
        apiHandler.removeDemand(demandId).then(() => {
            this.fetchDemandsByUser()
        }).catch((error) => {
          console.log(error);
        })
      }
    
    render() {

    const { demands } = this.state;
        return (
            <div className= "cardsContainer">
            <div className="container">
                {demands.map((demand) => {
                    return <CardMyDemands key={demand._id} handleDelete={this.handleDelete} {...demand} />
                })}
            </div> 
        </div>
        )
    }
}


export default MyDemands