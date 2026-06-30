"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

import api from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IDevice } from "@/types/devices.types";

function DevicesPage() {
  const { devices, mutate, error, isLoading } = api.devices.getAll();
  const [search, setSearch] = useState("");
  const searchFields: (keyof IDevice)[] = ["name", "location", "serial_number"];

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const onDelete = async (id: string) => {
    await api.devices.delete(id);
    mutate();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const filteredDevices = devices.filter((device: IDevice) => {
    if (!search.trim()) return true;

    const normalizedQuery = search.toLowerCase();

    return searchFields.some((field) => {
      const fieldValue = device[field];
      if (fieldValue !== null && fieldValue !== undefined) {
        return fieldValue.toString().toLowerCase().includes(normalizedQuery);
      }
      return false;
    });
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Devices</h1>
        <input
          name="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search devices..."
          className="border rounded-md px-3 py-1.5 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Serial Number</TableHead>
            {/* <TableHead></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDevices.length > 0 ? (
            filteredDevices.map((device: IDevice) => (
              <TableRow key={device.id}>
                <TableCell>
                  <Link
                    href={`/dashboard/devices/${device.id}`}
                    className="hover:underline font-medium"
                  >
                    {device.name}
                  </Link>
                </TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>{device.status}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {device.serial_number}
                </TableCell>
                {/* <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(device.id)}
                  >
                    Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-8"
              >
                No matches found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-right">
              Total Devices
            </TableCell>
            <TableCell colSpan={3}>{filteredDevices.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default DevicesPage;
