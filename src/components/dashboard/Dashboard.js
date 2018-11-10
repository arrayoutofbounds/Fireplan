import React, {Component} from 'react';
import Notifications from './Notifications';
import ProjectList from '../project/ProjectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render(){
        const { projects, auth, notifications } = this.props;
        if(!auth.uid){
            return <Redirect to='/signin' />
        }
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList projects={projects} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth, // get the current user auth
        notifications: state.firestore.ordered.notifications, // gets the array of ordered notifications
    }
}

// we are connecting this to redux from the collections and then accessing it here.
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc']},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
    ])
)(Dashboard);

// when this component mounts, the collection that i want to listen to is projects. When the firestore data is changed, it tells the firestore reducer to sync to state to this projects collection from firestore.
// so we are connecting to the firestore and then the redux store and syncing them up as needed for this component.