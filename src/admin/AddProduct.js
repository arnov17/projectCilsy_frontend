import React, {Fragment} from 'react'

const AddProduct = () => {
    return (
        <Fragment>
            <p className="section-title">Add New List Book</p>
            <div className="form-add-post">
                <label htmlFor="title">title</label>
                <input type="text" name="title" placeholder="add tiitle"/>
                <label htmlFor="body">Book content</label>
                <textarea name="body" id="body" cols="30" rows="10" placeholder="add blog content"></textarea>
                <button className="btn-submit" >Save</button>
            </div>
          </Fragment>
    )
}

export default AddProduct

