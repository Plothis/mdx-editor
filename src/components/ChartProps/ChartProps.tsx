import { Family, Purpose, GraphicCategory, Shape, DataPrerequisite, FAMILY_OPTIONS, PURPOSE_OPTIONS, GRAPHIC_CATEGORY_OPTIONS, SHAPE_OPTIONS } from "@antv/knowledge";
import { translateMapping } from "@antv/knowledge/lib/i18n";
import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Button, Select, message } from 'antd';
import { TranslateList } from "@antv/knowledge/lib/i18n/interface";
import CBKSelect, { OptionType as CkbOptionsOptionType } from "../CBKSelect";
import { EditableTagGroup } from "./EditableTagGroup";
import { CKBJson } from '../CBKSelect/addChart';


const { concepts } = translateMapping['zh-CN'] as TranslateList;
const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};


export type ChartKnowledgeEdit = {
    id: string;
    name: string;
    cnName: string;
    alias: string[];
    cnAlias: string[];
    family: Family[];
    def: string;
    cnDef: string;
    purpose: Purpose[];
    coord: [];
    category: GraphicCategory[];
    shape: Shape[];
    dataPres: DataPrerequisite[];
    channel: ("Area" | "Position" | "Length" | "Color" | "Angle" | "ArcLength" | "Direction" | "Size" | "Opacity" | "Stroke" | "LineWidth" | "Lightness")[], 
    recRate: "Recommended" | "Use with Caution" | "Not Recommended"
};

type TransKnowledgeProps = {
    name: string;
    alias: string[];
    def: string;
};

interface Props {
    onOk: (value: any) => void
    onVisibleChange: (v: boolean) => void
    visible: boolean
}

const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
    types: {
        // eslint-disable-next-line
        email: '${label} is not a valid email!',
        // eslint-disable-next-line
        number: '${label} is not a valid number!',
    },
    number: {
        // eslint-disable-next-line
        range: '${label} must be between ${min} and ${max}',
    },
};

const ChartPropsEidtor: React.FC<Props> = (props) => {

    const [zhCompletedKB, setZhCompletedKB] = useState(CKBJson("zh-CN"));
    const [visible, setVisible] = useState(props.visible);
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            "name": "test",
            "cnName": "test",
            "family": [
                "LineCharts",
                "ColumnCharts"
            ],
            "purpose": [
                "Hierarchy"
            ],
            "category": [
                "Statistic"
            ],
            "shape": [
                "Lines"
            ],
            // dataPres: [{ minQty: 1, maxQty: 1, fieldConditions: ["Interval"] }]
        })
    }, [form]);
    useEffect(() => {
        setVisible(props.visible);
        if (props.visible) {
            setZhCompletedKB(CKBJson("zh-CN"));
        }
    }, [props.visible]);
    
    const onFinish = (values: ChartKnowledgeEdit) => {
        const id = values.name.trim().replace(/[A-Z]/g, function(matchstr, index: number) {
            return matchstr ? matchstr.toLowerCase() : matchstr
        }).replace(/\s/g, '_')
        if (zhCompletedKB[id]) {
            message.error(`${values.name}已存在`)
            return
        }
        values.id = id;
        // 暂时写死
        values.recRate = "Not Recommended"
        values.channel = [] as any
        if (values.alias == null) {
            values.alias = []
        }
    
        props.onOk(values);
        handleVisibleChange(false);
    };
    const handleVisibleChange = (v:boolean) => {
        if (props.onVisibleChange) {
            props.onVisibleChange(v);
        }
    }
    const handleOk = () => {
        form.submit();
    }
    const handleCancel = () => {
        handleVisibleChange(false);
        form.resetFields();
    }
    const handleTemplateSelectChange = (name: string) => {

        const data = CKBJson('en-US')[name]

        const cnData = zhCompletedKB[name];
        // console.log({
        //     ...data,
        //     cnName: cnData.name,
        //     cnAlias: cnData.alias,
        // })
        // setChartInfo(data);
        form.setFieldsValue({
            ...data,
            cnName: cnData.name,
            cnAlias: cnData.alias,
        })
    }
    const ckbOptions: CkbOptionsOptionType [] = [];
    for (const key in zhCompletedKB) {
        const chartInfo = zhCompletedKB[key];

        const { category, purpose, shape, family, name, id } = chartInfo;
        ckbOptions.push({
            path: key,
            name: name,
        });
    }  

    return (
        <Modal title="" visible={visible} onOk={handleOk} onCancel={handleCancel} width="700px">
            <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>
                
                <Form.Item label="选择模板" help="没有的话需要手动填写下面表单">
                    <CBKSelect options={ckbOptions} onChange={handleTemplateSelectChange} />
                </Form.Item>
                
                <Form.Item name={'name'} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'cnName'} label="中文名" rules={[{ type: 'string', required: true }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item name={'alias'} label="alias" rules={[{ type: 'array' }]} >
                    <EditableTagGroup  />
                </Form.Item>
                <Form.Item name={'cnAlias'} label="中文别名" rules={[{ type: 'array' }]} >
                    <EditableTagGroup  />
                </Form.Item>
                <Form.Item name={'def'} label="def" rules={[{ type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'cnDef'} label="中文描述" rules={[{ type: 'string' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'family'} label="Family" rules={[{ type: 'array', min: 1, max: 99, required: true }]}>
                    <Select mode="multiple" placeholder="Select family">
                        {
                            FAMILY_OPTIONS.map((name) => {
                                return <Option value={name} key={name}>{name} - {concepts.family[name]}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'purpose'} label="Purpose" rules={[{ type: 'array', min: 1, max: 99, required: true }]}>
                    <Select mode="multiple" placeholder="Select purpose">
                        {
                            PURPOSE_OPTIONS.map((name) => {
                                return <Option value={name} key={name}>{name} - {concepts.purpose[name]}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'category'} label="Category" rules={[{ type: 'array', min: 1, max: 99, required: true }]}>
                    <Select mode="multiple" placeholder="Select category">
                        {
                            GRAPHIC_CATEGORY_OPTIONS.map((name) => {
                                return <Option value={name} key={name}>{name} - {concepts.category[name]}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name={'shape'} label="Shape" rules={[{ type: 'array', min: 1, max: 99, required: true }]}>
                    <Select mode="multiple" placeholder="Select shape">
                        {
                            SHAPE_OPTIONS.map((name) => {
                                return <Option value={name} key={name}>{name} - {concepts.shape[name]}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ChartPropsEidtor;