import { useState } from "react";
import { useSelector } from "react-redux";
import PaginationBar from "../../paginationBar/PaginationBar";
import { selectPage } from "../../paginationBar/paginationBarSlice";

const ArticleManagement = () => {
  const tempArticles = [
    {
      title: 'test title',
      topic: 'test topic',
      author: 'test author',
      published: '2021-09-0',
      credits: 100,
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      title: 'test title',
      topic: 'test topic',
      author: 'test author',
      published: '2021-09-0',
      credits: 100,
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      title: 'test title',
      topic: 'test topic',
      author: 'test author',
      published: '2021-09-0',
      credits: 100,
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      title: 'test title',
      topic: 'test topic',
      author: 'test author',
      published: '2021-09-0',
      credits: 100,
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      title: 'test title',
      topic: 'test topic',
      author: 'test author',
      published: '2021-09-0',
      credits: 100,
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    },
    {
      title: 'test title',
      topic: 'test topic',
      author: 'test author',
      published: '2021-09-0',
      credits: 100,
      createdAt: '1111-1-1',
      updatedAt: '1111-1-1'
    }
  ];
  const tablePage = useSelector(selectPage);
  const [entriesLimit, setEntriesLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const searchChangeHandler = e => {
    setSearchQuery(e.target.value);
  }

  const submit = () => {

  }

  return (
    <div className="access-management-div">
      <h2 className='title'>Article Management</h2>
      <p className="show-entries">
        Show 
        <select name="entries" id="entries-select">
          <option value="10">10</option>
          <option value="20">25</option>
          <option value="50">50</option>
        </select>
        entries
      </p>
      <div className="table-search">
        <form onSubmit={submit} className='table-search-form'>
          <button className="clear-search">
            <img src="https://img.icons8.com/fluency-systems-filled/18/64B5F7/xbox-x.png" alt='clear search button'/>
          </button>
          <input type="text" className='table-search-field' placeholder='Search...' onChange={searchChangeHandler} value={searchQuery} />
          <button type='submit' className="search-button">
            <img src="https://img.icons8.com/material-outlined/18/64B5F7/search--v1.png" alt='search button'/>
          </button>
        </form>
      </div>
      <table className='management-table'>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Topic</th>
            <th>Author</th>
            <th>Published</th>
            <th>Credits</th>
            <th>Created</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div className="action-buttons">
                <button>
                  <img src="https://img.icons8.com/android/16/15458A/plus.png" alt='create button'/>
                </button>
              </div>
            </td>
          </tr>
          { tempArticles.map( (article, i) => 
              <tr key={i}>
                <td>{article.title + i}</td>
                <td>{article.topic}</td>
                <td>{article.author}</td>
                <td>{article.published + i}</td>
                <td>{article.credits * i}</td>
                <td>{article.createdAt}</td>
                <td>{article.updatedAt}</td>
                <td>
                  <div className="action-buttons">
                    <button>
                      <img src="https://img.icons8.com/material-outlined/16/15458A/visible--v1.png" alt='view button' />
                    </button>
                    <button>
                      <img src="https://img.icons8.com/material-outlined/16/15458A/pencil--v1.png" alt='edit button'/>
                    </button>
                    <button>
                      <img src="https://img.icons8.com/ios-filled/16/15458A/menu-2.png" alt='more button'/>
                    </button>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <p className='entries-count'>{`Showing x to x of x entries`}</p>
      <PaginationBar use='admin' />
    </div>
  )
}

export default ArticleManagement
