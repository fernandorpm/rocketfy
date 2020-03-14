import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;
  opacity: ${props => props.done && 0.6};

  & + div {
    border-left: 1px solid rgba(0,0,0,0.10);
  }

  header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 42px;

      h2 {
          font-weight: bold;
          font-size: 16px;
          padding: 0 16px;
      }

      button {
          height: 42px;
          width: 42px;
          border-radius: 21px;
          background: #3b5bfb;
          border: 0;
          cursor: pointer;
      }
  }

  ul {
      margin-top: 20px;
  }
`;
