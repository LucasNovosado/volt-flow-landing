
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { MapPin, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Partner } from '@/components/landing/Partners';

const AdminPanel = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Sample initial data
  const initialPartners: Partner[] = [
    {
      id: '1',
      name: 'Posto São João',
      address: 'Av. Paulista, 1000, São Paulo',
      logo: '/placeholder.svg',
      coordinates: [-46.6546, -23.5646],
      featured: true,
      googleMapsUrl: 'https://maps.google.com/?q=-23.5646,-46.6546'
    },
    {
      id: '2',
      name: 'Supermercado Express',
      address: 'Rua Augusta, 500, São Paulo',
      logo: '/placeholder.svg',
      coordinates: [-46.6499, -23.5566],
      featured: false,
      googleMapsUrl: 'https://maps.google.com/?q=-23.5566,-46.6499'
    },
  ];

  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: '',
    address: '',
    logo: '',
    coordinates: [0, 0],
    featured: false,
    googleMapsUrl: ''
  });
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'latitude' || name === 'longitude') {
      const newCoordinates = [...(formData.coordinates || [0, 0])];
      if (name === 'latitude') {
        newCoordinates[1] = parseFloat(value) || 0;
      } else {
        newCoordinates[0] = parseFloat(value) || 0;
      }
      setFormData({ ...formData, coordinates: newCoordinates as [number, number] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just create a temporary URL
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, logo: imageUrl });
    }
  };
  
  // Open edit form for a partner
  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      ...partner,
    });
    setShowForm(true);
  };
  
  // Save partner data
  const handleSave = () => {
    if (!formData.name || !formData.address) {
      alert("Nome e endereço são obrigatórios");
      return;
    }
    
    // Update Google Maps URL based on coordinates
    const lat = formData.coordinates?.[1] || 0;
    const lng = formData.coordinates?.[0] || 0;
    const googleMapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
    
    if (editingPartner) {
      // Update existing partner
      setPartners(partners.map(p => 
        p.id === editingPartner.id 
          ? { ...formData, id: p.id, googleMapsUrl } as Partner 
          : p
      ));
    } else {
      // Add new partner
      const newId = Date.now().toString();
      setPartners([
        ...partners, 
        { ...formData, id: newId, googleMapsUrl } as Partner
      ]);
    }
    
    // Reset form
    setShowForm(false);
    setEditingPartner(null);
    setFormData({
      name: '',
      address: '',
      logo: '',
      coordinates: [0, 0],
      featured: false,
      googleMapsUrl: ''
    });
  };
  
  // Delete a partner
  const handleDelete = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Painel Admin - BATS Energy</h1>
            <p className="text-blue-300">Gerencie os parceiros e pontos de venda</p>
          </div>
          
          <div className="flex gap-2">
            <Link to="/">
              <Button 
                variant="outline"
                className="border-blue-500 text-blue-300 hover:bg-blue-900"
              >
                Ver Site
              </Button>
            </Link>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
            >
              + Adicionar Parceiro
            </Button>
          </div>
        </header>
        
        {/* Partner Management Form */}
        {showForm && (
          <Card className="mb-8 bg-blue-900/50 border-blue-700">
            <CardHeader>
              <CardTitle>{editingPartner ? 'Editar Parceiro' : 'Adicionar Novo Parceiro'}</CardTitle>
              <CardDescription className="text-blue-300">
                {editingPartner ? 'Atualize os dados do parceiro' : 'Preencha os dados do novo parceiro'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Parceiro</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    placeholder="Ex: Posto São João"
                    className="bg-blue-950/50 border-blue-700 text-white placeholder:text-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    placeholder="Ex: Av. Paulista, 1000, São Paulo"
                    className="bg-blue-950/50 border-blue-700 text-white placeholder:text-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="0.0001"
                    value={formData.coordinates?.[0] || 0}
                    onChange={handleChange}
                    placeholder="Ex: -46.6546"
                    className="bg-blue-950/50 border-blue-700 text-white placeholder:text-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="0.0001"
                    value={formData.coordinates?.[1] || 0}
                    onChange={handleChange}
                    placeholder="Ex: -23.5646"
                    className="bg-blue-950/50 border-blue-700 text-white placeholder:text-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo (opcional)</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="w-full border-blue-700 text-blue-300"
                      type="button"
                    >
                      Selecionar Imagem
                    </Button>
                    <input 
                      ref={fileInputRef}
                      id="logo"
                      name="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  {formData.logo && (
                    <div className="mt-2 p-2 bg-blue-950/80 rounded border border-blue-800 h-20 flex items-center justify-center">
                      <img 
                        src={formData.logo} 
                        alt="Preview" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-blue-700 text-yellow-500 focus:ring-blue-500"
                    />
                    <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Exibir como Destaque
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                onClick={() => {
                  setShowForm(false);
                  setEditingPartner(null);
                }}
                variant="outline"
                className="border-red-800 text-red-400 hover:bg-red-950"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700"
              >
                Salvar
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Partners List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map(partner => (
            <Card 
              key={partner.id} 
              className={`bg-blue-900/30 border-blue-800/40 hover:border-blue-600/60 transition-all duration-300 ${partner.featured ? 'ring-2 ring-yellow-500/50' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{partner.name}</CardTitle>
                    <CardDescription className="text-blue-300 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {partner.address}
                    </CardDescription>
                  </div>
                  {partner.featured && (
                    <span className="bg-yellow-500 text-xs font-bold text-black px-2 py-1 rounded-full">Destaque</span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="py-2">
                {partner.logo && (
                  <div className="h-16 mb-2 bg-blue-950/50 rounded flex items-center justify-center p-2">
                    <img 
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full object-contain"
                    />
                  </div>
                )}
                <div className="text-sm text-blue-200">
                  <p className="text-xs">Coordenadas: {partner.coordinates[1]}, {partner.coordinates[0]}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button 
                  variant="ghost" 
                  onClick={() => handleEdit(partner)}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-800/50"
                >
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/30">
                      Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-blue-950 border-blue-800">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription className="text-blue-300">
                        Tem certeza que deseja excluir o parceiro {partner.name}? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-transparent border-blue-700 text-blue-300 hover:bg-blue-900">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-red-600 text-white hover:bg-red-700"
                        onClick={() => handleDelete(partner.id)}
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
