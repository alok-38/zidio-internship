"use client";
import { useEffect, useState } from 'react';
import { getPerformance } from '../../../../app/actions/getPerformance';
import Chart from '../../../../components/performance/Chart';
import DataCard from '../../../../components/performance/DataCard';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface PerformanceData {
  name: string;
  total: number;
  count: number;
}

const PerformancePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state type annotation
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]); // PerformanceData array type annotation

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const { userId } = auth();

        if (!userId) {
          return redirect('/sign-in');
        }

        const { data } = await getPerformance(userId); // Assuming getPerformance returns an object with a data array
        setPerformanceData(data); // Assuming data is an array of PerformanceData objects
        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setError('Error fetching performance data. Please try again later.');
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {performanceData.map((item, index) => (
          <div key={index}>
            <DataCard value={item.total} label={item.name} shouldFormat />
            <DataCard value={item.count} label="Count" />
          </div>
        ))}
        <Chart data={performanceData} />
      </div>
    </div>
  );
};

export default PerformancePage;
