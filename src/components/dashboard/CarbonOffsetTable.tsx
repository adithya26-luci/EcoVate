
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CarbonOffset } from '@/types';

interface CarbonOffsetTableProps {
  offsets: CarbonOffset[];
}

const CarbonOffsetTable: React.FC<CarbonOffsetTableProps> = ({ offsets }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Carbon Offset Projects</CardTitle>
        <CardDescription>Recent carbon offset initiatives</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Tons CO₂</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offsets.map((offset) => (
              <TableRow key={offset.id}>
                <TableCell className="font-medium">{offset.project}</TableCell>
                <TableCell className="hidden sm:table-cell">{formatDate(offset.date)}</TableCell>
                <TableCell className="text-right">{offset.amount.toFixed(1)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={getStatusVariant(offset.status)}>
                    {offset.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const getStatusVariant = (status: string): "default" | "outline" | "secondary" | "destructive" => {
  switch (status) {
    case 'verified':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default CarbonOffsetTable;
