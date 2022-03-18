import React from "react";
import { Web3Provider } from "@ethersproject/providers";
import { injectedConnector } from "../Connectors/injectedConnector";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Button, Flex, Box } from "rebass";
import { Card } from "rebass";
import ButtonStyled from "../Components/button";
import styled from "styled-components";
import CardStyled from "../Components/card";
import Header from "../Components/header";
import { Outlet } from "react-router";
import { WizAddresses } from "../Constants/WizAddresses";
import { Link } from "react-router-dom";
import { formatEther } from "@ethersproject/units";
import {
  Formik,
  Form,
  FormikHelpers,
  FormikProps,
  FieldProps,
  Field,
} from "formik";
import {
  useContract,
  useNodesContract,
  useWizContract,
} from "../Hooks/UseContract";
import { getProviderOrSigner } from "../Utils/getContract";
import { BigNumber, ethers } from "ethers";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  color: white;
  *::selection {
    background-color: blue;
  }
  ul li {
    display: flex;
    list-style-type: none;
    padding: 20px;
  }
  a {
    color: white;
    font-size: medium;
    text-decoration: none;
  }
  a:hover {
    transition: all 0.2s ease-out;
    color: orange;
    font-size: large;
  }
  .Main {
    background-color: black;
  }
  button {
    font-size: 1.1em;
    background-color: #36368114;
    color: white;
    margin: 20px;
    padding: 10px;
    //font-family: 'Roboto', sans-serif;
    transition: all 1s ease-out;
    box-shadow: 0px 8px 17px 2px rgba(0, 0, 0, 0.14),
      0px 3px 14px 2px rgba(0, 0, 0, 0.12), 0px 5px 5px -3px rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 10px;
    :hover {
      background-color: #3b6faa;
    }
    ::selection {
      background-color: #a13398c5;
    }
  }
  .connect {
    padding: 40px;
  }
  .item{
    margin: 20px;

  }
  .field{
    border-radius: 5px;
    font-size: .6em;
    padding: 5px;
  }
`;
const WizContract = {
  address: WizAddresses.token.bsctestnet,
  abi: [
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function transfer(address _to, uint256 _value) public returns (bool success)",
  ],
};
const NodeContract = {
  address: WizAddresses.nodes.bsctestnet,
  abi: [
    "function createNode(string memory name,string memory desc,uint256 amount) external",
  ],
};

interface MyFormValues {
  name: string;
  desc: string;
  amount: number;
}

function Home() {
  const { chainId, account, activate, active, library } = useWeb3React();
  const initialValues: MyFormValues = { name: "", desc: "", amount: 0 };
  //const WizContract =  useWizContract("0x89030a210618697dff0c80d490edb9e586e77526")
  const tokenContract = new ethers.Contract(
    WizContract.address,
    WizContract.abi,
    getProviderOrSigner(library, account)
  );
  const nodeContract = new ethers.Contract(
    NodeContract.address,
    NodeContract.abi,
    getProviderOrSigner(library, account)
  );
  //const NodeContract =  useNodesContract(WizAddresses.nodes.bsctestnet)
  const onClick = async () => {
    activate(injectedConnector);
  };
  const onApprove = async () => {
    // await WizContract?.approve(NodeContract?.address,100)
    const amount = ethers.utils.parseUnits("1000000000000000000000001");

    tokenContract?.approve(WizAddresses.nodes.bsctestnet, amount);
  };
  return (
    <>
      {active ? (
        <Wrapper>
          <Flex
            sx={{
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                p: 3,
                flexGrow: 1,
                flexBasis: 350,
              }}
            >
              <CardStyled>
                Welcome to CheeseWiz!
                <br />
                <br />
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (values, actions) => {
                    console.log({ values, actions });
                    actions.setSubmitting(false);
                    let overrides: any = {
                      gasLimit: 400000,
                    };
                    let args = [values.name, values.desc, values.amount];
                    try {
                      await nodeContract?.createNode(...args, overrides);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <Form>
                    <div className="item">
                      <label htmlFor="name"> Name</label>
                      <br />
                      <Field id="name" name="name" placeholder="name" className="field" />
                    </div>
                    <br />
                    <div className="item">
                      <label htmlFor="desc"> Description</label>
                      <br />
                      <Field id="desc" name="desc" placeholder="description" className="field"  />
                    </div>
                    <div className="item">
                      <label htmlFor="amount"> Amount</label>
                      <br />
                      <Field id="amount" name="amount" placeholder="amount" className="field" />
                    </div>
                    <Box>
                      {/* <ButtonStyled onClick={onApprove}>Approve</ButtonStyled>  */}
                      <button onClick={onApprove}>Approve</button>

                      <button type="submit">Submit</button>
                    </Box>
                  </Form>
                </Formik>
              </CardStyled>
            </Box>
          </Flex>
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="connect">
            Please connect MetaMask to continue
            <br />
            <br />
            <ButtonStyled onClick={onClick}>Connect</ButtonStyled>
          </div>
        </Wrapper>
      )}
    </>
  );
}

export default Home;
