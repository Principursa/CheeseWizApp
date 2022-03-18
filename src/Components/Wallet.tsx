import React from "react";
import styled from "styled-components";
import { Button } from "rebass";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector} from "../Connectors/injectedConnector";
import { useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Davatar from "@davatar/react";
const StyledButton = styled(Button)`
  background-color: inherit;
  color: white;
  margin: 5px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-color: black;
  border: 5px solid;
  border-radius: 40px;
  text-overflow: ellipsis;
  .objects{
      display: flex;
      flex-direction: row;
  }
  .contents{
      display: flex;
      flex-direction: row;
      width: 160px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .identicon{
          padding-right: 5px;
      }
  }
`;
function Wallet() {
  const { chainId, account, activate, active, library } =
    useWeb3React();
  const onClick = async () => {
    activate(injectedConnector);
  };
  return (
    <>
      {active ? (
        <StyledButton>
            <div className="objects">

          <div className="contents">
            <div className="identicon">
              {account && library?.provider && (
                <Davatar
                  address={account}
                  size={20}
                  provider={library.provider}
                  generatedAvatarType='jazzicon'
                />
              )}
            </div>
            <div className="address">{account}</div>
          </div>
          ...
            </div>
        </StyledButton>
      ) : (
        <div>
          <StyledButton ></StyledButton>
        </div>
      )}
    </>
  );
}

export default Wallet;
