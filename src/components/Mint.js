import React, {useEffect, useRef, useState} from 'react';
import { useMoralis } from "react-moralis";
import Moralis from 'moralis';
import {abi} from '../abi/abi';
import LoadingSpinner from './Spinner';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
// console.log(CONTRACT_ADDRESS);

const Mint = () => {
    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, user} =
    useMoralis();

    const [file, setFile] = useState(null);
    const [toggleSuccess, setToggleSuccess] = useState(false);
    const [ropstenLink, setRopstenLink] = useState('')

    const name = useRef();
    const description = useRef();
    const imgHash = useRef(file);

    const [isLoading, setIsLoading] = useState(false);
    // const { native } = useMoralisWeb3Api();

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
        setIsLoading(true);
        const file1 = new Moralis.File(metaData.name+".json", {base64 : btoa2(JSON.stringify(metaData))});
        let finalFile = await file1.saveIPFS();
        const metaDataURI = file1.ipfs();
        console.log(metaDataURI);

        const txt = await mintToken(metaDataURI).then(() => {
            console.log('notify')
        });
        console.log(txt)
        console.log(JSON.stringify(finalFile));
    }

    async function mintToken(token_uri) {
        const account = (user.get('ethAddress'));
        console.log(account);
        const options = {
            contractAddress: CONTRACT_ADDRESS,
            functionName: "safeMint",
            abi: ABI,
            msgValue: Moralis.Units.ETH(0.01),
            params: {to: account, uri: token_uri}
        }
        console.log(options)
        // eslint-disable-next-line no-unused-vars
        const tx = await Moralis.executeFunction({...options}).then((response, err) => {
            if(err) {
                setIsLoading(false);
                console.log(err)
            }
            console.log('ropten etherscan here: \n', 'https://ropsten.etherscan.io/tx/'+response.hash);
            
            if(response) {
                setIsLoading(false);
                setToggleSuccess(true);
                setRopstenLink('https://ropsten.etherscan.io/tx/'+response.hash);
                setTimeout(() => {
                    setToggleSuccess(!toggleSuccess);
                },3000)
            }
            console.log(response)
        });
        
       
    }

    useEffect(() => {
        if(isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
        
    }, [isAuthenticated, isWeb3Enabled, isWeb3EnableLoading, enableWeb3])


    return(
        <div className='body'>
            <div>
                {toggleSuccess?
                <div>
                    <div className="alert alert-success" role="alert">
                    <div>You have succesfully minted a NFT</div>
                    <div>Check out the transaction link below</div>
                    <div>
                            <a href={ropstenLink} target='_blank' rel='noreferrer'>
                                {ropstenLink}
                            </a>
                        </div>
                    </div>
                    
                    <div className='mint'>
                    <h2 id='mint-title'>Sea Horse Minter</h2>
                    <form>
                        <a href='/mint'>
                            <button className='btn glowing' id='mint-button'>Mint Another</button>
                        </a>
                    </form>
                </div>
                </div>
                : 
                <div>
                    {isLoading? 
                        <LoadingSpinner /> 
                    : 
                        <div>
                            <h2 id='welcome-minter'>Welcome to your minter</h2>
                            <div className='mint'>
                                <h2 id='mint-title'>Sea Horse Minter</h2>
                                <form>
                                <input className="form-control" type="text" placeholder="name" ref={name}/>
                                <br />
                                <input className="form-control" type="text" placeholder="description" ref={description}/>
                                
                                <div className="form-group">
                                <label htmlFor="img-file" id="img-file">Please upload your NFT img file below</label>
                                <input type="file" accept=".jpg,.png,.gif" className="form-control-file" id="exampleFormControlFile1" onChange={ (e) => {
                                    console.log(e.target.files[0])
                                    setFile(e.target.files[0])}} ref={imgHash}/>
                                </div>
                                    
                                    <button className='btn glowing' id='mint-button' onClick={submit}>Mint</button>
                                </form>
                            </div>
                            <div className='mint-bullets-container'>
                                <div className='row'>
                                    <div className='mint-background col'>
                                        <p className='mint-bullets'>Stored on IPFS</p>
                                    </div>
                                    <div className='mint-background col'>
                                        <p className='mint-bullets'>0.01 ETH mint fee</p>
                                    </div>
                                    <div className='mint-background col'>
                                        <p className='mint-bullets col'>Must be a .jpg, .png, or .gif</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='mint-background col'>
                                        <p className='mint-bullets col'>Create NFT's On-Demand</p>
                                    </div>
                                    <div className='mint-background col'>
                                        <p className='mint-bullets'>Mint your very own unique NFT</p>
                                    </div>
                                    <div className='mint-background col'>
                                        <p className='mint-bullets col'>Make your collection scarce</p>
                                    </div> 
                                </div>

                            </div>
                        </div>
                    }
                      
                </div>
                }
            </div>
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