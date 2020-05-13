import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getCaseSummary} from "../../feature/case/action";

const _Contact = (props) => {

};

const Contact = connect(
    state => ({}),
    dispatch => bindActionCreators({
        getCaseSummary
    }, dispatch)
)(
    _Contact
);

export default Contact;