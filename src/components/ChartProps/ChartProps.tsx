import { Family, Purpose, GraphicCategory, Shape, DataPrerequisite, FAMILY_OPTIONS, PURPOSE_OPTIONS, GRAPHIC_CATEGORY_OPTIONS, SHAPE_OPTIONS } from "@antv/knowledge";
import { translateMapping } from "@antv/knowledge/lib/i18n";
import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Button, Select } from 'antd';
import { TranslateList } from "@antv/knowledge/lib/i18n/interface";

const { concepts } = translateMapping['zh-CN'] as TranslateList;
const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};
type ChartKnowledge = {
    id?: string;
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
};

type TransKnowledgeProps = {
    name: string;
    alias: string[];
    def: string;
};

interface Props {
    onChange: (value: any) => void
    onVisibleChange: (v: boolean) => void
    visible: boolean
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const ChartPropsEidtor: React.FC<Props> = (props) => {
    const [propData, setPropsData] = useState<ChartKnowledge>({} as ChartKnowledge);
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
            ]
        })
    }, []);
    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);
    
    const onFinish = (values: ChartKnowledge) => {
        props.onChange(values);
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
    return (
        <Modal title="" visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'name'} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={'cnName'} label="中文名" rules={[{ type: 'string', required: true }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item name={'alias'} label="alias" rules={[{ type: 'string' }]}>
                    <Input placeholder="多个用 ; 分隔" />
                </Form.Item>
                <Form.Item name={'cnAlias'} label="中文别名" rules={[{ type: 'string' }]}>
                    <Input placeholder="多个用 ; 分隔" />
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