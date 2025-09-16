import React, { Component } from "react"
// import { Link } from "gatsby"
import { Box, /*Label,*/ Input, Select, Textarea } from "theme-ui";

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import Container from "../components/layout/container/container"

class ContactPage extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  // handleSubmit = (event) => {
  //   // event.preventDefault();
  //   console.log('All good!');
  // }

  renderForm =() => {
    return (
      <Box
        as="form"
        name="contact"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        // action="/submit-success/"
        // onSubmit={this.handleSubmit}
      >
        <Input type="hidden" name="bot-field" />
        <Input type="hidden" name="form-name" value="contact" />

        {/*<Label htmlFor="firstName">First name</Label>*/}
        <Input
          type="text"
          name="firstName"
          placeholder="Your first name"
          value={this.state.firstName}
          onChange={this.handleInputChange}
          mb={1}
        />

        {/*<Label htmlFor="lastName">Last name</Label>*/}
        <Input
          type="text"
          name="lastName"
          placeholder="Your last name"
          value={this.state.lastName}
          onChange={this.handleInputChange}
          mb={1}
        />

        {/*<Label htmlFor="lastName">Email</Label>*/}
        <Input
          type="email"
          name="email"
          placeholder="Your email"
          value={this.state.email}
          onChange={this.handleInputChange}
          mb={1}
        />

        <Select name="category" defaultValue="general-inquiry" mb={3}>
          <option value="general-inquiry" selected="true">General Inquiry</option>
          <option value="sales-inquiry">Sales Inquiry</option>
        </Select>

        {/*<Label htmlFor="lastName">Message</Label>*/}
        <Textarea
          name="message"
          placeholder="Write something here..."
          value={this.state.message}
          onChange={this.handleInputChange}
          rows='6'
          mb={1}
        />

        <br/>
        <button className="button">Send</button>
      </Box>
    )
  }

  render() {
    return (
      <Layout>
        <SEO title="Contact us"/>
        <Container>
          <h1>Contact Us</h1>
          <hr/>
          <p style={{ fontSize: "1.2em" }}>
            Please leave a message and we will get back to you as soon as possible.
          </p>
          {this.renderForm()}
          <br/><br/>
        </Container>
      </Layout>
    )
  }
}

export default ContactPage
