import React from "react"

const blogPost = ({ data }) => {
  const post = data.markdownRemark
  return (
    <div style={{ width: "70%", margin: "0 auto" }}>
      <h1>{post.frontmatter.title}</h1>
      <div>
        <p>
          <b>Date : </b>
          {post.frontmatter.date}
        </p>
        <p>
          <b>Author : </b>
          {post.frontmatter.author}
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

export default blogPost

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
      }
    }
  }
`
