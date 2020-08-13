import styled from 'styled-components'


const NavbarStyled = styled.div`

  background-color: orange;
  box-shadow :  0 5px 8px 1px #888888c5;
  z-index: 1;
  // position: fixed;
  right: 0;
  left: 0;

  ul {
    display: flex;
    margin: 0 auto;
    max-width: 800px;
    justify-content: space-between;
    list-style-type: none;
  }

  li {
    padding: 1rem 2rem 1.15rem;
    text-transform: uppercase;
    color: white;
    min-width: 80px;
    margin: auto;
  }

  li:hover {
    background: rgb(214, 145, 16);
    color: white;
    font-weight: bold;
    transition: .2s;
  }

  li a {
    color: black;
    text-decoration: none;
  }

  li a span {
    border-radius: 100px;
    background: #fe3e3e;
    color: white;
    font-weight: bold;
    padding: 4px 9px;
    margin-left: 2px;
  }
`

export {
  NavbarStyled
}