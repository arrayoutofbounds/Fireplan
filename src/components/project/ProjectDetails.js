import React from 'react';

const ProjectDetails = (props) => {
    const id = props.match.params.id;

    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Project Title - {id}</span>
                    <p>Cillum reprehenderit id tempor fugiat proident adipisicing nostrud occaecat pariatur magna mollit cillum.</p>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                    <div>
                        Post by Anmol Desai
                    </div>
                    <div>
                        Posted on 2nd September
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetails;
