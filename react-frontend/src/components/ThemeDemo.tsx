import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const ThemeDemo: React.FC = () => {
  return (
    <Box className="p-6 space-y-6">
      <Typography variant="h4" className="kgf-text-gradient">
        KGF Theme System Demo
      </Typography>
      
      {/* KGF Gradient Examples */}
      <Card className="bg-card border border-border">
        <CardContent>
          <Typography variant="h6" className="text-card-foreground mb-4">
            KGF Gradients
          </Typography>
          <div className="space-y-4">
            <div className="kgf-gradient h-16 rounded-lg flex items-center justify-center">
              <Typography className="text-white font-medium">
                .kgf-gradient Background
              </Typography>
            </div>
            <Typography className="kgf-text-gradient text-2xl font-bold">
              .kgf-text-gradient Text
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card className="bg-card border border-border">
        <CardContent>
          <Typography variant="h6" className="text-card-foreground mb-4">
            KGF Color Palette
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-16 bg-kgf-primary rounded-lg"></div>
              <Typography className="text-sm text-muted-foreground">kgf-primary</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-kgf-secondary rounded-lg"></div>
              <Typography className="text-sm text-muted-foreground">kgf-secondary</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-kgf-background border border-border rounded-lg"></div>
              <Typography className="text-sm text-muted-foreground">kgf-background</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-16 bg-primary rounded-lg"></div>
              <Typography className="text-sm text-muted-foreground">primary</Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semantic Colors */}
      <Card className="bg-card border border-border">
        <CardContent>
          <Typography variant="h6" className="text-card-foreground mb-4">
            Semantic Color Tokens
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 bg-background border border-border rounded"></div>
              <Typography className="text-sm text-muted-foreground">background</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-card border border-border rounded"></div>
              <Typography className="text-sm text-muted-foreground">card</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-muted rounded"></div>
              <Typography className="text-sm text-muted-foreground">muted</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-accent rounded"></div>
              <Typography className="text-sm text-muted-foreground">accent</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-destructive rounded"></div>
              <Typography className="text-sm text-muted-foreground">destructive</Typography>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-ring rounded"></div>
              <Typography className="text-sm text-muted-foreground">ring</Typography>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Colors */}
      <Card className="bg-card border border-border">
        <CardContent>
          <Typography variant="h6" className="text-card-foreground mb-4">
            Chart Colors
          </Typography>
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="space-y-2">
                <div className={`w-full h-12 bg-chart-${num} rounded`}></div>
                <Typography className="text-sm text-muted-foreground text-center">
                  chart-{num}
                </Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography Examples */}
      <Card className="bg-card border border-border">
        <CardContent>
          <Typography variant="h6" className="text-card-foreground mb-4">
            Typography System
          </Typography>
          <div className="space-y-3">
            <h1 className="text-foreground">Heading 1 - Default Styling</h1>
            <h2 className="text-foreground">Heading 2 - Default Styling</h2>
            <h3 className="text-foreground">Heading 3 - Default Styling</h3>
            <p className="text-muted-foreground">Paragraph text with muted foreground color</p>
            <label className="text-foreground">Label with medium font weight</label>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Elements */}
      <Card className="bg-card border border-border">
        <CardContent>
          <Typography variant="h6" className="text-card-foreground mb-4">
            Interactive Elements
          </Typography>
          <div className="space-y-4">
            <Button 
              variant="contained" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Primary Button
            </Button>
            <Button 
              variant="outlined" 
              className="border-secondary text-secondary-foreground hover:bg-secondary"
            >
              Secondary Button
            </Button>
            <div className="p-4 bg-muted rounded-lg">
              <Typography className="text-muted-foreground">
                This is a muted background container
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThemeDemo;
