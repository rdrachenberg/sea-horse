import React, {useEffect, useRef, useState} from 'react';
import { useMoralis, useMoralisFile, useMoralisWeb3Api, useMoralisWeb3ApiCall} from "react-moralis";
import Moralis from 'moralis';
import {abi} from '../abi/abi'


const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
// console.log(CONTRACT_ADDRESS);


const Mint = () => {
    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, useWeb3ExecuteFunction, user} =
    useMoralis();

    const [file, setFile] = useState(null);

    const name = useRef();
    const description = useRef();
    const imgHash = useRef(file);
    const { native } = useMoralisWeb3Api();

    const ABI = abi;
    // console.log(ABI);

    async function submit(e) {
        e.preventDefault();
        // console.log('file button clicked')
        // console.log(file);
        let imgFile = new Moralis.File(file.name, file);
        let finalImgFile = await imgFile.saveIPFS();
        console.log(finalImgFile._url);
        console.log(finalImgFile.ipfs(), finalImgFile.hash());
        const hash = await finalImgFile.hash()
   
        const metaData = {
            name: name.current.value,
            description: description.current.value,
            image: 'https://gateway.moralisipfs.com/ipfs/'+ hash
        }

        const btoa2 = function(str) {
            return Buffer.from(str).toString('base64');
        }

        const file1 = new Moralis.File(metaData.name+".json", {base64 : btoa2(JSON.stringify(metaData))});
        let finalFile = await file1.saveIPFS();
        const metaDataURI = file1.ipfs();
        console.log(metaDataURI);

        const txt = await mintToken(metaDataURI).then(() => {
            console.log('notify')
        });
        console.log(JSON.stringify(finalFile));
    }

    async function mintToken(token_uri) {
        const account = (user.get('ethAddress'));
        console.log(account);
        const options = {
            contractAddress: CONTRACT_ADDRESS,
            functionName: "safeMint",
            abi: ABI,
            params: {to: account, uri: token_uri}
        }

        const tx = await Moralis.executeFunction({...options}).then((response, err) => {
            if(err) {
                console.log(err)
            }
            console.log('ropten etherscan here: \n', 'https://ropsten.etherscan.io/tx/'+response.hash);

        });
        console.log(tx);
       
    }

    function done() {

    }
    

    

    useEffect(() => {
        if(isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
        
    }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, enableWeb3])


    return(
        <div className='mint'>
            <h2 id='mint-title'>Sea Horse Minter</h2>
            <form>
            <input className="form-control" type="text" placeholder="name" ref={name}/>
            <br />
            <input className="form-control" type="text" placeholder="description" ref={description}/>
            
            <div className="form-group">
            <label htmlFor="img-file" id="img-file">Please upload your NFT img file below</label>
            <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={ (e) => {
                console.log(e.target.files[0])
                setFile(e.target.files[0])}} ref={imgHash}/>
            </div>
                
                <button className='btn glowing' id='mint-button' onClick={submit}>Mint</button>
            </form>
        </div>
    )
}

export default Mint
 
    // const uploadFile = (file) => {
    //     const base64 = file;
    //     saveFile(
    //         "myfile.txt",
    //         {base64},
    //         {
    //             type: "base64",
    //             saveIPFS: true,
    //             onSuccess: (result) => console.log(result.ipfs()),
    //             onError: (error) => console.log(error)
    //         }
    //     );
    // };

// const ipfsHash = imgHash.current.value;
        // await ipfsHash.saveIPFS();
        // console.log(file)
        // uploadFile(imgHash.current.files[0]);
        //const file = new Moralis.File(metaData.name+".json", {base64 : btoa2(JSON.stringify(metaData))});