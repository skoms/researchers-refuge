import { useDispatch } from "react-redux";
import { updateEntriesLimit } from '../../adminPanelSlice';
import { toFirstPage } from "../../../paginationBar/paginationBarSlice";
import styles from './EntriesSelect.module.css';

const EntriesSelect = () => {
  const dispatch = useDispatch();
  
  const limitChangeHandler = e => {
    dispatch(updateEntriesLimit(e.target.value));
    dispatch(toFirstPage());
  }

  return (
    <div className={styles.container}>
      Show 
      <select className={styles.select} name="entries" id="entries-select" onChange={limitChangeHandler}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
      entries
    </div>
  )
}

export default EntriesSelect
