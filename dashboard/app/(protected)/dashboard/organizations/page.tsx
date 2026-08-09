"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import api from "@/api";
import { IOrg } from "@/types/organizations.types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

function OrganizationsPage() {
  const { orgs, mutate, error, isLoading } = api.organizations.getAll();
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  if (error) return <div>Failed to load organizations.</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const org = await api.organizations.create(newName.trim());
      mutate();
      setCreateOpen(false);
      setNewName("");
      router.push(`/dashboard/organizations/${org.id}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    await api.organizations.delete(id);
    mutate();
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Organizations</h1>
        <Button onClick={() => setCreateOpen(true)}>New Org</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Members</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orgs && orgs.length > 0 ? (
            orgs.map((org: IOrg) => (
              <TableRow key={org.id}>
                <TableCell>
                  <Link
                    href={`/dashboard/organizations/${org.id}`}
                    className="hover:underline font-medium"
                  >
                    {org.name}
                  </Link>
                </TableCell>
                <TableCell>{org.users?.length ?? 0}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(org.id)}
                  >
                    Delete
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
                No organizations yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} className="text-right">
              Total
            </TableCell>
            <TableCell>{orgs?.length ?? 0}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Organization name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={creating || !newName.trim()}>
              {creating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrganizationsPage;
