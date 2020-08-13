import React, {Component, Fragment} from 'react'
import './blogPost.css'
import axios from 'axios'
import {connect} from 'react-redux'


const AddProduct = () => {


    state = {
        post: [],
        formlogPost : {
            id : 1,
            title : '',
            body : '',
            userId : 1
        },
        isUpdate : false
    }
   
    hanldeFormChange = (event) => {
        let formBlogPostNew = {...this.state.formlogPost}
        // console.log('new value, ', formBlogPostNew)
        formBlogPostNew[event.target.name] = event.target.value;
        // console.log(event.target.name)
        let timestamp = new Date().getTime()

        // ketika di submit update, false akan tiak membuat perubahan id, hanya berubah id ketika submit post baru
        if(!this.state.isUpdate) {
            formBlogPostNew['id'] = timestamp;
        }
      
        this.setState({
            formlogPost : formBlogPostNew
        }, () => {
            // console.log('value obj formBlogPost', this.state.formlogPost)
        })
    }

    handleSubmit = () => {
        // console.log(this.state.formlogPost)
        if(this.state.isUpdate) {
            this.putDataAPI()
        } else {
        this.postDatatoAPI()
        }
    }
 
    // componentDidMount() {
    //     this.getPostAPI()
    // }

    return (
        <Fragment>
            <p className="section-title">Add New List Book</p>
            <div className="form-add-post">
                <label htmlFor="title">title</label>
                <input type="text" value={this.state.formlogPost.title}name="title" placeholder="add tiitle" onChange={this.hanldeFormChange}/>
                <label htmlFor="body">Book content</label>
                <textarea name="body" id="body" value={this.state.formlogPost.body} cols="30" rows="10" placeholder="add blog content" onChange={this.hanldeFormChange}></textarea>
                <button className="btn-submit" onClick={this.handleSubmit}>Save</button>
            </div>
          </Fragment>
    )
}

