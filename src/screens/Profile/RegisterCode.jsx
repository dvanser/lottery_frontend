import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import styles from './RegisterCode.module.scss';
import {NavBar, Text, Input, Button, Footer} from '../../components';
import { FormattedMessage, useIntl } from 'react-intl';
import Select from 'react-select';
import { postFileRequest, postRequest } from '../../_library';
import {ToyReview} from "../../components/ToyReview";


export const FileFrom = props => {

    return (
        <div>
            <div>
                {props.data.error && (props.data.error === 'wrong_data_supplied' || props.data.error === 'number_not_provided'
                    || props.data.error === 'not_allowed_file_extension') &&
                    <Text error><FormattedMessage id={`pols.add.file.error.${props.data.error}`}/></Text>
                }
                {props.data.error && (props.data.error !== 'wrong_data_supplied' && props.data.error !== 'number_not_provided'
                    && props.data.error !== 'not_allowed_file_extension') &&
                    <Text error><FormattedMessage id={`pols.add.file.error.unexpected`}/></Text>
                }
            </div>
            <div>
                <Row>
                    <Col xs={6}>
                        <Input label="pols.profile.register_code.file_from.cheque_number" value={props.data.cheque} onChange={e => props.onChange(props.id, e, 'chequeNumber')} name="chequeNumber" type="text" />
                    </Col>
                    <Col xs={6}>
                        {!props.data.selected &&
                            <div className={'mt-3 ' + styles.fileUploadInputWrapper}>
                                <label className={styles.fileUploadInput} htmlFor={'chequeFile_' + props.id}>
                                    <Text small label="pols.profile.register_code.file_from.upload"/>
                                </label>
                                <input hidden onChange={e => props.onChange(props.id, e, 'chequeFile')}
                                       id={'chequeFile_' + props.id} name="chequeFile" type="file"/>
                            </div>
                        }
                        {props.data.selected &&
                            <div className={'mt-3 pt-4 ' + styles.fileUploadInputWrapper}>
                                <Text small>
                                    <div>
                                        <Text small label="pols.profile.register_code.file_from.upload.selected_file" />
                                    </div>
                                    {props.data.files[0].name}
                                </Text>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        </div>
    );

};

export const CodeFrom = props => {

    const [codes, setCodes] = useState({});


    const handleOnChange = (id, value) => {
        const newCodes = Object.assign(codes);
        newCodes[id] = value;
        setCodes(newCodes);
        props.onChange(newCodes);
    };

    return (
        <div>
            <div className="mt-3">
                {props.error && (props.error === 'wrong_data_supplied' || props.error === 'not_valid_code') &&
                    <Text error><FormattedMessage id={`pols.add.code.error.${props.error}`}/></Text>
                }
                {props.error && (props.error !== 'wrong_data_supplied' && props.error !== 'not_valid_code') &&
                    <Text error><FormattedMessage id={`pols.add.code.error.unexpected`}/></Text>
                }
            </div>
            {[...Array(parseInt(props.count))].map((id, idx) => (
                    <div key={idx} className="mt-3">
                        <Input label="pols.profile.register_code.code_from.code"
                               name="code" value={codes[idx]} onChange={e => handleOnChange(idx, e)} type="text" />
                    </div>
                )
            )}
        </div>
    );

};


export const RegisterCode = () => {

    const [step, setStep] = useState(0);
    const [requestsData, setRequestsData] = useState([
        {files: [], cheque: '', selected: false}
    ]);
    const [codesData, setCodesData] = useState({});
    const [codesError, setCodesError] = useState('');
    const [codesCount, setCodesCount] = useState(1);

    const intl = useIntl();

    const handleFilesCountChange = count => {
        setRequestsData([...Array(parseInt(count.value)).keys()].map(() => (
                {files: [], cheque: '', selected: false}
            )
        ));

        setStep(step + 1);
    };

    const handleCodesCountChange = count => {
        setCodesCount(count.value);
        if (step < 2) {
            setStep(step + 1);
        }
    };

    const handleFileFormChange = (id, e, type) => {
        let newRequestsData = [...requestsData];

        if (type === 'chequeNumber') {
            newRequestsData[id].cheque = e;
        } else {
            newRequestsData[id].files = e.target.files;
            newRequestsData[id].selected = true;
        }

        setRequestsData(newRequestsData);
    };

    const handleCodeFormChange = codes => {
        setCodesData(codes);
    };

    const handleSubmit = () => {

        postRequest('/codes', {codes: Object.values(codesData)})
            .then(response => {
                requestsData.forEach((file, idx) => {

                    const filesData = new FormData();

                    if (file.files) {
                        filesData.append('cheque', file.files[0]);
                    }

                    filesData.append('number', file.cheque);

                    postFileRequest(`/cheque`, filesData)
                        .then(response => {
                            console.log(idx, response);
                        }).catch(response => {

                            let newRequestsData = [...requestsData];

                            if (response.error) {
                                newRequestsData[idx]['error'] = response.error
                            } else {
                                newRequestsData[idx]['error'] = response.error
                            }

                            setRequestsData(newRequestsData);
                        });
                });
            }).catch(response => {

                if (response.error) {
                    setCodesError(response.error);
                }
            });
    };

    const renderSelect = (labelId, count, onChange) => (
        <Select className={'mt-3 ' } classNamePrefix="pols-select" placeholder={intl.formatMessage({id: labelId})} isSearchable={false}
                options={[...[...Array(count)].map((_, idx) => ({value: idx + 1, label: idx + 1}))]}
                onChange={onChange} />
    );

    return(
        <>
            <NavBar/>
            <div className={styles.wrapper}>
                <Row>
                    <Col md={{size:6, order: 1}} xs={{size:12, order: 2}}  className="pr-md-5">
                        <ToyReview />
                    </Col>
                    <Col md={{size:6, order: 2}} xs={{size:12, order: 1}} className="mb-5">
                        <div className="text-center">
                            <Text h1 label="pols.profile.register_code.register_code" />
                        </div>
                        {step === 0 &&
                            <div>
                                {renderSelect('pols.profile.register_code.cheque_amount', 10, handleFilesCountChange)}
                            </div>
                        }
                        {(step === 1 || step === 2) &&
                            <>
                                <div>
                                    {requestsData.map((data, idx) => (
                                            <FileFrom key={idx} id={idx} data={data} onChange={handleFileFormChange} />
                                        )
                                    )}
                                    <Text small label="pols.profile.register_code.remember" />
                                </div>
                                {renderSelect('pols.profile.register_code.select_codes_amount', 100, handleCodesCountChange)}
                                {step === 2 &&
                                    <>
                                        <div>
                                            <CodeFrom error={codesError} count={codesCount} data={codesData} onChange={handleCodeFormChange} />
                                        </div>
                                        <Button className="mt-3" onClick={handleSubmit}>
                                            <FormattedMessage id="pols.profile.register_code.btn.submit" />
                                        </Button>
                                    </>
                                }
                            </>
                        }
                    </Col>
                </Row>
            </div>
            <Footer background="whiteWave" />
        </>
    );

};
