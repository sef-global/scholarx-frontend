import React from 'react'
import { Collapse } from 'antd';

const { Panel } = Collapse;

function FAQCollapse() {

    return(
        <Collapse style={{background:'transparent', fontFamily:'-apple-system, SanFranciscoText, sans-serif', fontSize:'15px', fontWeight:600, color:'#1D1D1F'}}>
            <Panel header="What are the eligibility requirements?" key="1">
                Answer 1
            </Panel>
            <Panel header="What are the eligibility requirements?" key="2">
                Answer 2
            </Panel>
            <Panel header="What are the eligibility requirements?" key="2">
                Answer 3
            </Panel>
        </Collapse>
    )
}

export default FAQCollapse;