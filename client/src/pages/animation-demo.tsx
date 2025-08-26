import React, { useState } from 'react';
import { 
  PageTransition, 
  StaggeredGrid, 
  AnimatedCard, 
  AnimatedButton, 
  BounceAnimation, 
  FlipCard, 
  CelebrationEffect 
} from '@/shared/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import CertificateCard from '@/shared/components/certificates/CertificateCard';
import { ChevronUp, Award, Star, Heart, ThumbsUp } from 'lucide-react';

const AnimationDemo: React.FC = () => {
  const [bounceCounter, setBounceCounter] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [voteTrigger, setVoteTrigger] = useState(false);

  const handleBounceDemo = () => {
    setBounceCounter(prev => prev + 1);
  };

  const handleCelebrationDemo = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const handleVoteDemo = () => {
    setVoteTrigger(true);
    setTimeout(() => setVoteTrigger(false), 400);
  };

  const demoCards = [
    { id: 1, title: "Eco Solar Panel", price: "$299", rating: 4.8 },
    { id: 2, title: "Bamboo Water Bottle", price: "$24", rating: 4.9 },
    { id: 3, title: "Organic Cotton Tote", price: "$18", rating: 4.7 },
    { id: 4, title: "LED Plant Grow Light", price: "$89", rating: 4.6 },
    { id: 5, title: "Compost Bin Set", price: "$45", rating: 4.8 },
    { id: 6, title: "Solar Charger", price: "$67", rating: 4.5 },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎨 EcoBingle Animation Showcase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience smooth, eco-themed animations designed for sustainability and accessibility.
              All animations respect user preferences for reduced motion.
            </p>
          </div>

          {/* Interactive Demos Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Bounce Animation Demo */}
            <AnimatedCard className="p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                🎾 Bounce Animations
              </h2>
              <p className="text-gray-600 mb-6">
                Perfect for upvotes, reactions, and celebratory actions.
              </p>
              
              <div className="flex items-center space-x-4">
                <AnimatedButton
                  variant="eco"
                  onClick={handleVoteDemo}
                  className="bg-eco-green text-white px-4 py-2 rounded-lg hover:bg-eco-green-dark"
                >
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Upvote
                </AnimatedButton>
                
                <BounceAnimation trigger={voteTrigger}>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-eco-green">42</span>
                    <Heart className="h-5 w-5 text-red-500 fill-current" />
                  </div>
                </BounceAnimation>
                
                <AnimatedButton
                  variant="eco"
                  onClick={handleBounceDemo}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Like ({bounceCounter})
                </AnimatedButton>
              </div>
            </AnimatedCard>

            {/* Celebration Effect Demo */}
            <AnimatedCard className="p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                🎉 Celebration Effects
              </h2>
              <p className="text-gray-600 mb-6">
                Falling leaves and confetti for achievements and awards.
              </p>
              
              <div className="space-y-3">
                <AnimatedButton
                  variant="glow"
                  onClick={handleCelebrationDemo}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Trigger Celebration! 🌿
                </AnimatedButton>
                
                <p className="text-sm text-gray-500 text-center">
                  Click to see falling eco-leaves animation
                </p>
              </div>
            </AnimatedCard>
          </div>

          {/* Certificate 3D Flip Demo */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
              🏆 3D Certificate Flip Cards
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Hover over the certificates to see the 3D flip effect. Each certificate shows detailed information on the back.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <CertificateCard
                title="Eco Warrior"
                description="Reduced carbon footprint by 50%"
                issueDate="December 2024"
                level="gold"
                earned={true}
              />
              <CertificateCard
                title="Solar Champion"
                description="Installed renewable energy system"
                issueDate="November 2024"
                level="platinum"
                earned={true}
              />
              <CertificateCard
                title="Green Gardener"
                description="Started sustainable urban garden"
                issueDate="October 2024"
                level="silver"
                earned={false}
              />
            </div>
          </div>

          {/* Staggered Grid Demo */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
              📦 Staggered Grid Animations
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Products and blog cards animate in with a beautiful staggered effect, creating a smooth and engaging user experience.
            </p>
            
            <StaggeredGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {demoCards.map((product) => (
                <AnimatedCard key={product.id} enableHover={true}>
                  <Card className="overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-green-400 to-blue-500"></div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-eco-green">{product.price}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              ))}
            </StaggeredGrid>
          </div>

          {/* Button Variants Demo */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
              🎛️ Animated Button Variants
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <AnimatedCard className="p-6 bg-white rounded-xl shadow-lg text-center">
                <h3 className="font-semibold mb-4">Default Buttons</h3>
                <div className="space-y-3">
                  <AnimatedButton className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg">
                    Default
                  </AnimatedButton>
                  <AnimatedButton className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Primary
                  </AnimatedButton>
                </div>
              </AnimatedCard>

              <AnimatedCard className="p-6 bg-white rounded-xl shadow-lg text-center">
                <h3 className="font-semibold mb-4">Eco Buttons</h3>
                <div className="space-y-3">
                  <AnimatedButton 
                    variant="eco" 
                    className="w-full bg-eco-green text-white px-4 py-2 rounded-lg"
                  >
                    Eco Hover
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="eco" 
                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Nature
                  </AnimatedButton>
                </div>
              </AnimatedCard>

              <AnimatedCard className="p-6 bg-white rounded-xl shadow-lg text-center">
                <h3 className="font-semibold mb-4">Glow Buttons</h3>
                <div className="space-y-3">
                  <AnimatedButton 
                    variant="glow" 
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg border border-purple-300"
                  >
                    Glow Effect
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="glow" 
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg border border-indigo-300"
                  >
                    Magic Glow
                  </AnimatedButton>
                </div>
              </AnimatedCard>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
              ✨ Animation Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: "♿",
                  title: "Accessibility First",
                  description: "Respects prefers-reduced-motion and provides fallbacks"
                },
                {
                  icon: "📱",
                  title: "Mobile Optimized",
                  description: "Smooth performance on all devices and screen sizes"
                },
                {
                  icon: "🌱",
                  title: "Eco Theme",
                  description: "Green glows, nature-inspired effects, and earth tones"
                },
                {
                  icon: "⚡",
                  title: "Performance",
                  description: "GPU-accelerated transforms and optimized animations"
                },
                {
                  icon: "🎨",
                  title: "Consistent Design",
                  description: "Unified timing, easing, and visual language"
                },
                {
                  icon: "🔧",
                  title: "Reusable",
                  description: "Modular components for easy implementation"
                }
              ].map((feature, index) => (
                <AnimatedCard key={index} enableHover={true}>
                  <Card className="p-6 text-center h-full">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8">
            <p className="text-gray-600">
              All animations are built with Framer Motion and respect user accessibility preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Celebration Effect */}
      <CelebrationEffect 
        trigger={showCelebration} 
        type="leaves" 
        duration={3000}
        particleCount={25}
      />
    </PageTransition>
  );
};

export default AnimationDemo;
