import { Card, CardContent } from "@/components/ui/card";

interface IStatCard {
  title: string;
  value: number;
}

function StatCard({ title, value }: IStatCard) {
  return (
    <Card>
      <CardContent>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

export default StatCard;
