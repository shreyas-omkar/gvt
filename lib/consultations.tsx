import { AlertCircle, CheckCircle, Globe, Star, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function getStatusBadge(status: string) {
  switch (status) {
    case 'pending':
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          <AlertCircle className="h-3 w-3 mr-1" />Pending
        </Badge>
      );
    case 'confirmed':
      return (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <CheckCircle className="h-3 w-3 mr-1" />Confirmed
        </Badge>
      );
    case 'completed':
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />Completed
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" />Cancelled
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export function getConsultationIcon(type: string) {
  return type === 'astrology' ? (
    <Star className="h-4 w-4 text-orange-600" />
  ) : (
    <Globe className="h-4 w-4 text-blue-600" />
  );
}

export function getConsultationTypeText(type: string) {
  return type === 'astrology' ? 'Vedic Astrology' : 'Vastu Nirnaya';
}