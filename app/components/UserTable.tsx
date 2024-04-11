"use client";

import {
  Table,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Container,
} from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";

const UserTable: React.FC = () => {
  const [userInfo, setInfo] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let userData = await axios.get(
        "https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users"
      );
      console.log(userData.data) ;
      setInfo(userData.data);
    } catch (error) {
      console.log("Error Occur");
    }
  };

  const rows = userInfo.map((item) => {
    return (
      <Table.Tr key={item.id}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        <Table.Td>{item.createdAt}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container>
      <ScrollArea>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Creating Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
};

export default UserTable;
