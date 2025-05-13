"use client";

import React, { useEffect } from "react";
import { Form, Input, Select, Row, Col, Button, Space } from "antd";
import type { FilterCharacter } from "@/graphql/generated/rickmorty";
import { CHARACTER_GENDERS, CHARACTER_STATUSES } from "@/shared/constant";

const { Option } = Select;

interface CharacterFilterBarProps {
  initialAppliedFilters: FilterCharacter;
  onApplyFilters: (filters: FilterCharacter) => void;
  onResetFilters: () => void;
}

const CharacterFilterBar: React.FC<CharacterFilterBarProps> = ({
  initialAppliedFilters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [form] = Form.useForm<FilterCharacter>();

  useEffect(() => {
    const filtersAreEmpty = Object.keys(initialAppliedFilters).length === 0;

    if (filtersAreEmpty) {
      form.resetFields();
    } else {
      form.setFieldsValue(initialAppliedFilters);
    }
  }, [initialAppliedFilters, form]);

  const handleFinish = (values: FilterCharacter) => {
    const cleanFilters: FilterCharacter = {};
    Object.entries(values).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        cleanFilters[key as keyof FilterCharacter] = value;
      }
    });
    onApplyFilters(cleanFilters);
  };

  const handleReset = () => {
    onResetFilters();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialAppliedFilters}
      onFinish={handleFinish}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Form.Item name="status" label="Status">
            <Select placeholder="Any status" allowClear>
              {CHARACTER_STATUSES.map((s) => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item name="species" label="Species">
            <Input placeholder="Any species" allowClear />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item name="gender" label="Gender">
            <Select placeholder="Any gender" allowClear>
              {CHARACTER_GENDERS.map((g) => (
                <Option key={g} value={g}>
                  {g}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item name="type" label="Type">
            <Input placeholder="Any type" allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Apply Filters
          </Button>
          <Button onClick={handleReset}>Reset Filters</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CharacterFilterBar;
