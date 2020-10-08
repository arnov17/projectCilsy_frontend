import React, { Fragment, useState, Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";

import axios from "axios";
import { ENDPOINT, access_token } from "../../utils/global/index";

class SetCategoryPage extends Component {
  state = {
    category: [],
  };
  refresh = () => {
    const getcategory = async () => {
      const categories = await axios.get(`${ENDPOINT}/category/read/`);
      if (categories) {
        this.setState({
          category: categories.data || [],
        });
      }
    };
    getcategory();
  };
  componentDidMount() {
    return this.refresh();
  }

  deleteCategory = async (id) => {
    console.log(id);
    const request = axios.delete(`${ENDPOINT}/category/delete`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(request);
    window.location.reload();
    // return this.refresh();
  };

  render() {
    // console.log(this.state.category.data);
    return (
      <Fragment>
        <div className="App">
          <Link to="/admin/setProduct" style={{ cursor: "pointer" }}>
            <h2>&larr;</h2>
          </Link>
          <header className="App-header">
            <div className="container m-3">
              <h2 style={{ color: "black" }}>category List</h2>
              <LinkContainer
                to="/admin/addCategory"
                style={{ cursor: "pointer" }}
              >
                <button>Submit New Category</button>
              </LinkContainer>
            </div>
            <div className="container">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete List</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.category.data &&
                    this.state.category.data.map((val, key) => {
                      // console.log(val);
                      return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{val.category_name}</td>
                          <td>
                            <LinkContainer
                              to={`/admin/UpdateCategory/${val.id}`}
                              style={{ cursor: "pointer" }}
                            >
                              <Button variant="success">Edit</Button>
                            </LinkContainer>{" "}
                          </td>
                          <td onClick={() => this.deleteCategory(val.id)}>
                            <Button variant="danger">Delete</Button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </div>
          </header>
        </div>
      </Fragment>
    );
  }
}

// const SetCategoryPage = (props) => {
//   const [ListCategory, setListcategory] = useState({
//     category: [],
//   });

//   const categories = async () => {
//     await axios.get(`${ENDPOINT}/category/read`);
//   };

//   console.log(categories);

//   return (
//     <Fragment>
//       <div className="App">
//         <header className="App-header">
//           <div className="container m-3">
//             <h2 style={{ color: "black" }}>category List</h2>
//             <LinkContainer
//               to="/admin/addCategory"
//               style={{ cursor: "pointer" }}
//             >
//               <button>Submit New Category</button>
//             </LinkContainer>
//           </div>
//           <div className="container">
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>No</th>
//                   <th>Category</th>
//                   <th>Edit</th>
//                   <th>Delete List</th>
//                 </tr>
//               </thead>
//             </Table>
//           </div>
//         </header>
//       </div>
//     </Fragment>
//   );
// };

export default SetCategoryPage;
