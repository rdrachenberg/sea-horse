import React, {useEffect, useRef, useState, useCustomHookFetchHook} from 'react';
import { useMoralis, useMoralisFile} from "react-moralis";

import Moralis from 'moralis';


const Mint = () => {
    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

    const [file, setFile] = useState(null);

    const {saveFile, moralisFile} = useMoralisFile();

    const name = useRef();
    const description = useRef();
    const imgHash = useRef(file);

    

    const uploadFile = (file) => {
        const base64 = file;
        saveFile(
            "myfile.txt",
            {base64},
            {
                type: "base64",
                saveIPFS: true,
                onSuccess: (result) => console.log(result.ipfs()),
                onError: (error) => console.log(error)
            }
        );
    };

    async function submit(e) {
        e.preventDefault();
        
        console.log('file button clicked')
        console.log(file);
        // imgHash.current?.click();
        let imgFile = new Moralis.File(file.name, file);
        let finalImgFile = await imgFile.saveIPFS();
        console.log(finalImgFile._url);
        console.log(finalImgFile.ipfs(), finalImgFile.hash());
   
       
        const metaData = {
            name: name.current.value,
            description: description.current.value,
            image: 'https://gateway.moralisipfs.com/ipfs/'+ finalImgFile.hash()
        }

        console.log(metaData);

        const btoa2 = function(str) {
            return Buffer.from(str).toString('base64');
        }
        const file1 = new Moralis.File(metaData.name+".json", {base64 : btoa2(JSON.stringify(metaData))});
        
        let finalFile = await file1.save();
        console.log(JSON.stringify(finalFile));
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

            <button className='btn btn-primary' onClick={submit}>Mint</button>

            </form>
        </div>
    )
}

export default Mint

  // const options = { address: "0x27c5ee7d81a430b12a2aa9c7b19e8cf01944afce", chain: "ropsten"};
    // let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    // console.log(NFTs)

// const ipfsHash = imgHash.current.value;
        // await ipfsHash.saveIPFS();
        // console.log(file)
        // uploadFile(imgHash.current.files[0]);
        //const file = new Moralis.File(metaData.name+".json", {base64 : btoa2(JSON.stringify(metaData))});