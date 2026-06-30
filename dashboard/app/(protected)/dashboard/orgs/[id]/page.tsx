"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import api from "@/api";
import { IOrgUser } from "@/types/orgs.types";
import { IDevice } from "@/types/devices.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function OrgDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { org, mutate, error, isLoading } = api.orgs.get(id);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [addUserId, setAddUserId] = useState("");
  const [saving, setSaving] = useState(false);

  if (error) return <div>Failed to load organization.</div>;
  if (isLoading || !org) return <div>Loading...</div>;

  const handleRename = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      await api.orgs.update(org.id, newName.trim());
      mutate();
      setEditing(false);
      setNewName("");
    } finally {
      setSaving(false);
    }
  };

  const handleAddUser = async () => {
    if (!addUserId.trim()) return;
    await api.orgs.addUser(org.id, addUserId.trim());
    mutate();
    setAddUserId("");
  };

  const handleRemoveUser = async (userId: string) => {
    await api.orgs.removeUser(org.id, userId);
    mutate();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        {editing ? (
          <>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="w-64"
              autoFocus
            />
            <Button onClick={handleRename} disabled={saving || !newName.trim()}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => { setEditing(false); setNewName(""); }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">{org.name}</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setEditing(true); setNewName(org.name); }}
            >
              Rename
            </Button>
          </>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Devices</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {org.devices && org.devices.length > 0 ? (
              org.devices.map((device: IDevice) => (
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                  No devices
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Members</h2>
        <div className="flex gap-2 max-w-md">
          <Input
            placeholder="User ID"
            value={addUserId}
            onChange={(e) => setAddUserId(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddUser()}
          />
          <Button onClick={handleAddUser} disabled={!addUserId.trim()}>
            Add
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>ID</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {org.users && org.users.length > 0 ? (
              org.users.map((user: IOrgUser) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.id}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground py-8"
                >
                  No members yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default OrgDetailPage;
