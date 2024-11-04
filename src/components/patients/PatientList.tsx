import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit2, ToggleLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  status: 'Active' | 'Pending';
  lastOnline: string;
  lastPurchaseDate: string;
  totalSpent: number;
  averageCheck: number;
  averageItems: number;
  country?: string;
  city?: string;
  deliveryAddresses?: string[];
  emailVerified: boolean;
  personalDataSigned: boolean;
  tcSigned: boolean;
}

const PatientList = () => {

  const patients: Patient[] = [
    {
      id: '1',
      name: 'Jainit',
      email: 'jainit@example.com',
      phone: '+1234567890',
      status: 'Active',
      lastOnline: '12/10/2024',
      lastPurchaseDate: '12/10/2024',
      totalSpent: 1599,
      averageCheck: 499,
      averageItems: 1,
      emailVerified: true,
      personalDataSigned: true,
      tcSigned: true,
    },
    // Add more sample data as needed
  ];

  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search patients..."
              className="pl-8 w-64"
            />
          </div>
          <select className="border rounded-md px-3 py-2">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <Button
          className="flex items-center gap-2"
          asChild
        >
          <Link href="/users/create-patients">
            <Plus className="h-4 w-4" />
            Add Patient
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer">Patient Name ↓</TableHead>
                <TableHead className="cursor-pointer">Email</TableHead>
                <TableHead className="cursor-pointer">Status</TableHead>
                <TableHead className="cursor-pointer">Last Online</TableHead>
                <TableHead className="cursor-pointer">Last Purchase</TableHead>
                <TableHead className="cursor-pointer">Total Spent</TableHead>
                <TableHead className="cursor-pointer">Avg. Check</TableHead>
                <TableHead className="cursor-pointer">Avg. Items</TableHead>
                <TableHead>Verification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${patient.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}
                    >
                      {patient.status}
                    </span>
                  </TableCell>
                  <TableCell>{patient.lastOnline}</TableCell>
                  <TableCell>{patient.lastPurchaseDate}</TableCell>
                  <TableCell>${patient.totalSpent}</TableCell>
                  <TableCell>${patient.averageCheck}</TableCell>
                  <TableCell>{patient.averageItems}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      <span className={patient.emailVerified ? 'text-green-600' : 'text-red-600'}>
                        {patient.emailVerified ? '✓' : '×'} Email
                      </span>
                      <span className={patient.personalDataSigned ? 'text-green-600' : 'text-red-600'}>
                        {patient.personalDataSigned ? '✓' : '×'} Personal Data
                      </span>
                      <span className={patient.tcSigned ? 'text-green-600' : 'text-red-600'}>
                        {patient.tcSigned ? '✓' : '×'} T&C
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => {
                        // TODO: Implement edit patient functionality
                        console.log('Edit patient:', patient.id);
                      }}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => {
                        // TODO: Implement toggle status functionality
                        console.log('Toggle status:', patient.id);
                      }}>
                        <ToggleLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientList;