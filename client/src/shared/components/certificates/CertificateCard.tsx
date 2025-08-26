import React, { useState } from 'react';
import { FlipCard, CelebrationEffect } from '@/shared/animations';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Award, Star, Download, Share2 } from 'lucide-react';

interface CertificateCardProps {
  title: string;
  description: string;
  issueDate: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned?: boolean;
  onAward?: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  description,
  issueDate,
  level,
  earned = false,
  onAward
}) => {
  const [showCelebration, setShowCelebration] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze':
        return 'from-amber-700 to-amber-500';
      case 'silver':
        return 'from-gray-400 to-gray-300';
      case 'gold':
        return 'from-yellow-400 to-yellow-200';
      case 'platinum':
        return 'from-purple-400 to-purple-200';
      default:
        return 'from-gray-400 to-gray-300';
    }
  };

  const handleAward = () => {
    setShowCelebration(true);
    onAward?.();
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const frontContent = (
    <div className={`h-80 w-full rounded-lg bg-gradient-to-br ${getLevelColor(level)} p-6 text-white shadow-lg`}>
      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <Award className="h-8 w-8" />
          <Badge variant="secondary" className="bg-white/20 text-white">
            {level.toUpperCase()}
          </Badge>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {[...Array(level === 'platinum' ? 5 : level === 'gold' ? 4 : level === 'silver' ? 3 : 2)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-current" />
            ))}
          </div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        
        <div className="text-center">
          <p className="text-xs opacity-75">EcoBingle Certification</p>
        </div>
      </div>
    </div>
  );

  const backContent = (
    <Card className="h-80 w-full">
      <CardContent className="p-6 h-full flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-semibold mb-4">Certificate Details</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Achievement:</span>
              <p className="text-gray-600">{title}</p>
            </div>
            <div>
              <span className="font-medium">Description:</span>
              <p className="text-gray-600">{description}</p>
            </div>
            <div>
              <span className="font-medium">Level:</span>
              <span className={`ml-2 inline-block px-2 py-1 rounded text-xs font-medium
                ${level === 'platinum' ? 'bg-purple-100 text-purple-800' :
                  level === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                  level === 'silver' ? 'bg-gray-100 text-gray-800' :
                  'bg-amber-100 text-amber-800'
                }`}>
                {level.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="font-medium">Issue Date:</span>
              <span className="ml-2 text-gray-600">{issueDate}</span>
            </div>
          </div>
        </div>
        
        {earned ? (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleAward}
            className="w-full bg-eco-green hover:bg-eco-green-dark text-white"
          >
            <Award className="h-4 w-4 mr-2" />
            Earn Certificate
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <FlipCard
        frontContent={frontContent}
        backContent={backContent}
        className="w-full max-w-sm mx-auto"
        autoFlip={false}
      />
      <CelebrationEffect 
        trigger={showCelebration} 
        type="leaves" 
        duration={3000}
        particleCount={20}
      />
    </>
  );
};

export default CertificateCard;
