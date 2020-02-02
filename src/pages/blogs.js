import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

const PostsDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
  padding-bottom: 4rem;
  @media ${props => props.theme.sm} {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
`

const PostLink = styled(Link)`
  color: ${props => props.theme.black};
  text-decoration: none;
  background: ${props => props.theme.backgroundGrey};
  border-radius: 4px;
  transition: all ${props => props.theme.transitionDuration} ease-out;
  /* box-shadow: 3px 4px 4px rgba(0, 0, 0, 0.4); */
  -moz-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  &:hover {
    background: ${props => props.theme.hoverBackground};
    transform: scale(1.05);
  }
`
const H2 = styled.h2`
  margin-left: 20px;
`
const P = styled.p`
  margin-left: 20px;
`
const Span = styled.span`
  margin-left: 20px;
  color: ${props => props.theme.grey};
  font-style: italic;
`

const SecondPage = ({ data }) => {
  return (
    <div>
      <h1>Blog</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(post => (
        <PostsDiv key={post.node.frontmatter.title}>
          <PostLink to={`/${post.node.fields.slug}`}>
            <H2>{post.node.frontmatter.title}</H2>
            <Span>
              {post.node.frontmatter.author} | {post.node.frontmatter.date}
            </Span>
            <P>{post.node.frontmatter.excerpt}</P>
          </PostLink>
        </PostsDiv>
      ))}
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            excerpt
            author
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`

export default SecondPage
