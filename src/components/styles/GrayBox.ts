import styled from "styled-components";

const GrayBox = styled.div`
    padding: 2.4rem;
    min-width: 50rem;
    border-radius: 1rem;
    box-shadow: 0 1.2rem 1.3rem -.7rem rgba(0,0,0,0.36);
    background-color: ${({ theme }) => theme.colors.gray};
`

export default GrayBox;