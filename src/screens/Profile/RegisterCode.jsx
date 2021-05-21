import React, { useState } from "react";
import "./style.css";


export const FileFrom = props => {


    return (
        <div style={{marginTop: "20px"}}>
            FileFrom
            <div>
                {props.data.error &&
                <>{props.data.error}</>
                }
            </div>
            <div>
                number <input value={props.data.cheque} onChange={e => props.onChange(e, 'chequeNumber')} name="chequeNumber" type="text" />
                file <input onChange={e => props.onChange(e, 'chequeFile')} name="chequeFile" type="file" />
            </div>
        </div>
    );

};

export const CodeFrom = props => {

    const [codes, setCodes] = useState({});


    const handleOnChange = (id, e) => {
        const newCodes = Object.assign(codes);
        newCodes[id] = e.target.value;
        setCodes(newCodes);
        props.onChange(newCodes);
    };

    return (
        <div style={{marginTop: "50px"}}>
            CodeFrom
            <div>
                {props.error &&
                <>{props.error}</>
                }
            </div>
            {[...Array(props.count).keys()].map((id, idx) => (
                    <div key={idx}>
                        code
                        <input name="code" value={codes[id]} onChange={e => handleOnChange(id, e)} type="text" />
                    </div>
                )
            )}
        </div>
    );

};


export const Test = () => {

    const [requestsData, setRequestsData] = useState([
        {type: 'file', files: [], filename: '', cheque: ''}
    ]);
    const [codesData, setCodesData] = useState({});
    const [codesError, setCodesError] = useState('');
    const [codesCount, setCodesCount] = useState(1);

    const handleFilesCountChange = e => {
        setRequestsData([...Array(parseInt(e.target.value)).keys()].map(() => (
                {files: [], filename: '', cheque: ''}
            )
        ));
    };

    const handleFileFormChange = (id, e, type) => {

        let newRequestsData = [...requestsData];

        if (type === 'chequeNumber') {
            newRequestsData[id].cheque = e.target.value;
        } else {
            newRequestsData[id].files = e.target.files;
        }

        setRequestsData(newRequestsData);
    };

    const handleCodeFormChange = codes => {
        console.log('codes', codes);
        setCodesData(codes);
    };

    const handleSubmit = () => {
        //post request codesData
        //success for requestsData - file

        requestsData.forEach((file, idx) => {
            //post request requestsData - file
            //success
            // requestsData - file - status = success
            //setRequestsData()
            //catch
            let newRequestsData = [...requestsData];
            newRequestsData[idx]['error'] = 'error_' + idx.toString();
            // requestsData - file - status = error
            //setRequestsData()
        });


        //catch
        setCodesError('error occurred');


    };

    return(
        <>

            <div>Select files count</div>
            <select onChange={handleFilesCountChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>

            <div>
                {requestsData.map((data, idx) => (
                        <FileFrom key={idx} data={data} onChange={handleFileFormChange} />
                    )
                )}
            </div>
            <div onClick={() => handleFilesCountChange(2)}>select files count</div>


            <div>
                <CodeFrom error={codesError} count={codesCount} data={codesData} onChange={handleCodeFormChange} />
            </div>

            <button onClick={handleSubmit}>submit</button>
        </>
    );

};



export default function App() {
    return (
        <Test />
    );
}
