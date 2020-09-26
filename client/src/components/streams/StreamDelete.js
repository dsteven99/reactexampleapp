import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends React.Component {

    componentDidMount() {

        this.props.fetchStream(this.props.match.params.id);
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id);
    };

    renderActions = () => {
        return (
            <React.Fragment>
                <button onClick={this.onDelete} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    };

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>;
        }
        return (
            <Modal
                title="Delete Stream"
                content={`Are you sure you want to delete '${this.props.stream.title}' ?`}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };

};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);