interface StatCardProps {
    title: string;
    value: number;
    unit: string;
  }
  
  export default function StatCard({ title, value, unit }: StatCardProps) {
    return (
      <div style={{
        border: '1px solid #DEE2E6',
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        minWidth: '150px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#6C757D',
          marginBottom: '8px'
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '25px',
          fontWeight: 'bold',
          color: '#212529'
        }}>
          {value}{unit}
        </div>
      </div>
    );
  }