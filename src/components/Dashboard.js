import React, { Fragment, createRef, useState, useEffect } from 'react';
import machineData from '../utils/machineData';
import { getData } from '../api/Axios';

const Dashboard = () => {
	/* const { response, setResponse } = useAxios(); */
	const [ url, setUrl ] = useState('');
	const [ doi, setDoi ] = useState('loading');
	const [ check, setCheck ] = useState('');
	const [ show, setShow ] = useState(false);
	const [ disable, setDisable ] = useState(null);
	const [ loading, setLoading ] = useState(false);

	const dataRefs = [];

	machineData.forEach((_) => {
		dataRefs.push(createRef(null));
	});

	const modalHandler = (e, index) => {
		setUrl(dataRefs[index].current.innerText);
		setCheck(dataRefs[index].current.title);
		setShow(true);
		setDisable(true);
	};

	useEffect(
		() => {
			setLoading(true);
			getData(url, check).then((data) => {
				setDoi(data);
				setLoading(false);
			});
		},
		[ url, check ]
	);

	return (
		<Fragment>
			{machineData.map(({ id, content, title }, index) => {
				return (
					<Fragment>
						<div className='main-modal' key={id}>
							<div className='contained-modal'>
								<div id={id} className='para' title={title} ref={dataRefs[index]}>
									{content}
								</div>
								{!loading &&
								url === content && (
									<div className='sub-modal' style={{ display: url && show ? 'inherit' : 'none' }}>
										{`${content}`} <span> {`${doi}`} </span>
									</div>
								)}
							</div>

							<button
								key={index}
								disabled={disable && check === title ? true : false}
								onClick={(e) => modalHandler(e, index)}
								className='btn btm-sm btn-success'
							>
								CrossRef Check
							</button>
						</div>
					</Fragment>
				);
			})}
		</Fragment>
	);
};

export default Dashboard;
