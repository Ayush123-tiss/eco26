import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { AccessibleButton } from '@/shared/components/ui/accessible-button';
import { AccessibleInput, AccessibleTextarea, FormField } from '@/shared/components/ui/accessible-forms';
import { AccessibleModal, AccessibleMenu } from '@/shared/components/ui/accessible-modal';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Keyboard, 
  MousePointer, 
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Download,
  Share,
  Trash2
} from 'lucide-react';
import { useAnnouncer } from '@/shared/hooks/use-accessibility';

export default function AccessibilityDemo() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [highContrast, setHighContrast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [keyboardNav, setKeyboardNav] = useState(true);
  
  const announce = useAnnouncer();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      announce('Form submitted successfully!', 'polite');
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      announce('Please fix the errors in the form', 'assertive');
    }
  };

  const menuItems = [
    { label: 'Edit', onClick: () => announce('Edit action selected') },
    { label: 'Share', onClick: () => announce('Share action selected') },
    { label: 'Download', onClick: () => announce('Download action selected') },
    { label: 'Delete', onClick: () => announce('Delete action selected'), destructive: true },
  ];

  return (
    <div className={`min-h-screen p-6 ${highContrast ? 'bg-black text-white' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Accessibility Features Demo
          </h1>
          <p className="text-lg text-gray-600">
            Interactive examples of WCAG 2.1 compliant UI components with full keyboard navigation,
            screen reader support, and focus management.
          </p>
        </div>

        {/* Accessibility Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Accessibility Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <AccessibleButton
                variant={highContrast ? 'primary' : 'outline'}
                onClick={() => {
                  setHighContrast(!highContrast);
                  announce(highContrast ? 'High contrast disabled' : 'High contrast enabled');
                }}
                aria-pressed={highContrast}
                aria-label="Toggle high contrast mode"
              >
                {highContrast ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                {highContrast ? 'Disable' : 'Enable'} High Contrast
              </AccessibleButton>

              <AccessibleButton
                variant={soundEnabled ? 'primary' : 'outline'}
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  announce(soundEnabled ? 'Sound notifications disabled' : 'Sound notifications enabled');
                }}
                aria-pressed={soundEnabled}
                aria-label="Toggle sound notifications"
              >
                {soundEnabled ? <Volume2 className="mr-2 h-4 w-4" /> : <VolumeX className="mr-2 h-4 w-4" />}
                {soundEnabled ? 'Disable' : 'Enable'} Sound
              </AccessibleButton>

              <AccessibleButton
                variant={keyboardNav ? 'primary' : 'outline'}
                onClick={() => {
                  setKeyboardNav(!keyboardNav);
                  announce(keyboardNav ? 'Keyboard navigation disabled' : 'Keyboard navigation enabled');
                }}
                aria-pressed={keyboardNav}
                aria-label="Toggle keyboard navigation"
              >
                <Keyboard className="mr-2 h-4 w-4" />
                {keyboardNav ? 'Disable' : 'Enable'} Keyboard Nav
              </AccessibleButton>
            </div>
          </CardContent>
        </Card>

        {/* Button Examples */}
        <Card>
          <CardHeader>
            <CardTitle>🔘 Accessible Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AccessibleButton
                variant="primary"
                onClick={() => announce('Primary action executed')}
                aria-label="Execute primary action"
              >
                Primary Action
              </AccessibleButton>

              <AccessibleButton
                variant="secondary"
                loading={false}
                loadingText="Processing..."
                onClick={() => announce('Secondary action executed')}
              >
                Secondary Action
              </AccessibleButton>

              <AccessibleButton
                variant="destructive"
                onClick={() => announce('Destructive action executed')}
                aria-label="Perform destructive action - this cannot be undone"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Item
              </AccessibleButton>

              <AccessibleButton
                variant="outline"
                disabled
                aria-label="This action is currently unavailable"
              >
                Disabled Button
              </AccessibleButton>

              <AccessibleButton
                variant="ghost"
                onClick={() => announce('Ghost action executed')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </AccessibleButton>

              <AccessibleMenu
                trigger={
                  <AccessibleButton variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Actions Menu
                  </AccessibleButton>
                }
                items={menuItems}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Accessibility Features:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Focus visible rings on all interactive elements</li>
                <li>• ARIA labels for screen readers</li>
                <li>• Loading states with aria-busy</li>
                <li>• Keyboard navigation support</li>
                <li>• Disabled state handling</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Form Examples */}
        <Card>
          <CardHeader>
            <CardTitle>📝 Accessible Forms</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  htmlFor="demo-name"
                  required
                  error={errors.name}
                  description="Enter your first and last name"
                >
                  <AccessibleInput
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (errors.name) {
                        setErrors(prev => ({ ...prev, name: '' }));
                      }
                    }}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </FormField>

                <FormField
                  label="Email Address"
                  htmlFor="demo-email"
                  required
                  error={errors.email}
                  description="We'll never share your email with anyone"
                >
                  <AccessibleInput
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (errors.email) {
                        setErrors(prev => ({ ...prev, email: '' }));
                      }
                    }}
                    placeholder="john@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </FormField>
              </div>

              <FormField
                label="Message"
                htmlFor="demo-message"
                required
                error={errors.message}
                description="Tell us what you think about our accessibility features"
              >
                <AccessibleTextarea
                  value={formData.message}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, message: e.target.value }));
                    if (errors.message) {
                      setErrors(prev => ({ ...prev, message: '' }));
                    }
                  }}
                  placeholder="Your message here..."
                  rows={4}
                />
              </FormField>

              <div className="flex justify-end space-x-4">
                <AccessibleButton
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({ name: '', email: '', message: '' });
                    setErrors({});
                    announce('Form reset');
                  }}
                >
                  Reset Form
                </AccessibleButton>
                <AccessibleButton
                  type="submit"
                  variant="primary"
                >
                  Submit Form
                </AccessibleButton>
              </div>
            </form>

            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Form Accessibility Features:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Proper label associations with htmlFor</li>
                <li>• Required field indicators</li>
                <li>• Error messages with role="alert"</li>
                <li>• Descriptive help text</li>
                <li>• Form validation with announcements</li>
                <li>• Autocomplete attributes</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Modal Examples */}
        <Card>
          <CardHeader>
            <CardTitle>🪟 Accessible Modals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AccessibleButton
              onClick={() => setShowModal(true)}
              aria-haspopup="dialog"
            >
              Open Accessible Modal
            </AccessibleButton>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Modal Accessibility Features:</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Focus trap within modal</li>
                <li>• Return focus to trigger on close</li>
                <li>• Escape key to close</li>
                <li>• ARIA roles and properties</li>
                <li>• Background scroll prevention</li>
                <li>• Proper heading structure</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Status and Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>📢 Status Messages & Live Regions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <AccessibleButton
                variant="outline"
                onClick={() => announce('Success! Your action was completed.', 'polite')}
              >
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Success Message
              </AccessibleButton>

              <AccessibleButton
                variant="outline"
                onClick={() => announce('Warning: Please review your input.', 'polite')}
              >
                <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
                Warning Message
              </AccessibleButton>

              <AccessibleButton
                variant="outline"
                onClick={() => announce('Error: Something went wrong. Please try again.', 'assertive')}
              >
                <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                Error Message
              </AccessibleButton>

              <AccessibleButton
                variant="outline"
                onClick={() => announce('Info: Here\'s some helpful information.', 'polite')}
              >
                <Info className="mr-2 h-4 w-4 text-blue-600" />
                Info Message
              </AccessibleButton>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-medium text-indigo-900 mb-2">Live Region Features:</h4>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• Screen reader announcements</li>
                <li>• Polite vs assertive priorities</li>
                <li>• Status updates without focus changes</li>
                <li>• Dynamic content notifications</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Navigation Guide */}
        <Card>
          <CardHeader>
            <CardTitle>⌨️ Keyboard Navigation Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Basic Navigation</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Tab</Badge>
                    <span className="text-sm">Move to next element</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Shift + Tab</Badge>
                    <span className="text-sm">Move to previous element</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Enter</Badge>
                    <span className="text-sm">Activate button/link</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Space</Badge>
                    <span className="text-sm">Activate button/checkbox</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Escape</Badge>
                    <span className="text-sm">Close modal/menu</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Advanced Navigation</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Arrow Keys</Badge>
                    <span className="text-sm">Navigate within menus/lists</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Home/End</Badge>
                    <span className="text-sm">Jump to first/last item</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Page Up/Down</Badge>
                    <span className="text-sm">Scroll content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Ctrl + Home</Badge>
                    <span className="text-sm">Jump to page top</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accessible Modal */}
      <AccessibleModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Accessible Modal Example"
        description="This modal demonstrates proper focus management and keyboard navigation."
      >
        <div className="space-y-4">
          <p>
            This modal includes all accessibility best practices:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Focus is trapped within the modal</li>
            <li>First focusable element receives focus on open</li>
            <li>Focus returns to trigger button on close</li>
            <li>Escape key closes the modal</li>
            <li>Background is not scrollable</li>
            <li>Proper ARIA attributes are applied</li>
          </ul>
          
          <div className="flex justify-end space-x-3 pt-4">
            <AccessibleButton
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </AccessibleButton>
            <AccessibleButton
              onClick={() => {
                announce('Modal action confirmed');
                setShowModal(false);
              }}
            >
              Confirm
            </AccessibleButton>
          </div>
        </div>
      </AccessibleModal>
    </div>
  );
}
