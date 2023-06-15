import axios from 'axios';
// 0 = Excellent, 1 = Good, 2 = Average, 3 = Poor, 4 = Very Poor
const GradeImageHashes = ['QmWx4R1jtp7gYbHdMkTLYVdSjwNCyWawsfKK5Hb7asXz8P','Qmcr3EcFKyGwYYcS1Use4CvF1n1hUcTMqpc2p7MaDmV44t',
'QmNQw9ieGVttUXWTRQFEmsuFqmLuaAoq51jmp7zBvvju6J','QmNUxNHE63R5pskkcmRbfnotg6qLiUQPHVkacyaC9odRUK','QmPNzRaPevZiwPHsJeiJzjheX5ETAJCvzsf2ynvCzoFcpB']

let metadataHash = "0000000000";

export const handleJSONSubmission = async(RUL, BatteryID) => {
    //Move to seperate function so this can be used for manually added data as well
    let calculatedScore
    let imageHash = "ipfs://"
    if ( RUL > 890){
        calculatedScore = "Excellent"
        imageHash = imageHash.concat(GradeImageHashes[0])
    }
    else if ( RUL > 668) {
        calculatedScore = "Good"
        imageHash = imageHash.concat(GradeImageHashes[1])
    }
    else if (RUL > 445){
        calculatedScore = "Average"
        imageHash = imageHash.concat(GradeImageHashes[2])
    }
    else if (RUL > 223){
        calculatedScore = "Poor"
        imageHash = imageHash.concat(GradeImageHashes[3])
    }
    else {
        calculatedScore = "Very Poor"
        imageHash = imageHash.concat(GradeImageHashes[4])
    }
    
    const metadata = {
        name: "BatteryCertificate #" + BatteryID.toString(),
        description: "Unique EVB certificate",
        image: imageHash,
        properties: {
          materials: "Li-ion,NMC,Ni-MH,Li-S,Lead-Acid",
          grade: calculatedScore
        }
    }
    const jsonMetadata = JSON.stringify(metadata);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", jsonMetadata, {
          maxBodyLength: "Infinity",
          headers: {
            'Content-Type': `application/json`,
            'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
            'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET
          }
        });
        console.log(res.data.IpfsHash);
        metadataHash = res.data.IpfsHash;
      } catch (error) {
        console.log(error);
      }
}

export const handleFileSubmission = async(fileToPin) => {

    const formData = new FormData();
    
    formData.append('file', fileToPin)

    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': process.env.REACT_APP_PINATA_API_KEY,
          'pinata_secret_api_key': process.env.REACT_APP_PINATA_API_SECRET
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getMetadataHash = () => {
    return metadataHash;
}