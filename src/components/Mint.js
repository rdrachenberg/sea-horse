import React, {useEffect, useRef, useState} from 'react';
import { useMoralis, useMoralisFile} from "react-moralis";
import Moralis from 'moralis';


const Mint = () => {
    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

    const [file, setFile] = useState('');

    const {saveFile, moralisFile} = useMoralisFile();

    const name = useRef();
    const description = useRef();
    const imgHash = useRef();

    
   

    
    // const options = { address: "0x27c5ee7d81a430b12a2aa9c7b19e8cf01944afce", chain: "ropsten"};
    // let NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    // console.log(NFTs)

    async function submit(e) {
        e.preventDefault();
        
        console.log('file button clicked')

        const metaData = {
            name: name.current.value,
            description: description.current.value,
            image: "/ipfs/" + imgHash.current.value
        }

        const encodedString = Buffer.from(imgHash.current.value).toString('base64');
        const encodedStringTwo = Buffer.from(metaData.name).toString('base64');
        console.log(encodedString)
        console.log(encodedStringTwo)
        console.log(metaData);

        const imageFile = new Moralis.File(encodedStringTwo, encodedString);
        await imageFile.saveIPFS().then((res) => {
            console.log(res);
        });
        let imageHash = imageFile.hash();

        saveFile(imageHash);
        console.log(imageHash);
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
            <input type="file" className="form-control-file" id="exampleFormControlFile1" ref={imgHash}/>
            </div>

            <button className='btn btn-primary' onClick={submit}>Mint</button>

            </form>
        </div>
    )
}

export default Mint