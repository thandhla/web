import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RelationDropDown from './RelationDropDown';
import { getTempRecords, clearTempRecords } from '../../../../actions/records';

const mapStateToProps = (state, ownProps) => {
  return {
    isFetchingTempRecords: state.records.isFetchingTempRecords,
    tempRecords: state.records.tempRecords,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getTempRecords,
    clearTempRecords,
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(RelationDropDown);
